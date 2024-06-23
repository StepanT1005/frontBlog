import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Post, AddComment, CommentsBlock } from "@/components";
import {
  getIsAuth,
  useAppDispatch,
  useAppSelector,
  fetchPost,
  fetchComments,
} from "@/redux";
import { Skeleton } from "@mui/material";
import useSocket from "@/hooks/use-socket";
import styles from "./full-post.module.scss";

export const FullPost = () => {
  const { postId } = useParams<{ postId: string }>();

  const dispatch = useAppDispatch();
  const { isLoading, postData } = useAppSelector((state) => state.post);
  const currentUserId = useAppSelector((state) => state.user?.userData?._id);

  const comments = useAppSelector((state) => state.comments.comments);
  const isCommentsLoading = useAppSelector((state) => state.comments.isLoading);
  const isAuth = useAppSelector(getIsAuth);
  useSocket(postId);
  useEffect(() => {
    if (postId) {
      dispatch(fetchPost(postId));
      dispatch(fetchComments(postId));
    }
  }, [dispatch, postId]);

  if (isLoading || !postData) {
    return <Skeleton variant="rectangular" width="100%" height={400} />;
  }

  return (
    <>
      <Post
        id={postData._id}
        title={postData.title}
        imageUrl={postData.imageUrl || ""}
        user={postData.user}
        createdAt={postData.createdAt}
        viewsCount={postData.viewsCount}
        commentsCount={postData.comments?.length}
        tags={postData.tags}
        isFullPost
        isLoading={isLoading}
        isEditable={currentUserId === postData.user._id}
      >
        <ReactMarkdown className={styles.markdown}>
          {postData.text}
        </ReactMarkdown>
      </Post>
      <CommentsBlock items={comments} isLoading={isCommentsLoading} />
      {isAuth && <AddComment postId={postData._id} />}
    </>
  );
};

export default FullPost;
