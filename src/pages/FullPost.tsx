import React from "react";

import { Post } from "../components/Post";
import { AddComment } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import axios from "../axios";
import { selectIsAuth } from "../redux/slices/auth";

export const FullPost = () => {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const [isCommentPublicated, setIsCommentPublicated] = useState(false);
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Помилка при отриманні статті");
      });
    return () => setIsCommentPublicated(false);
  }, [isCommentPublicated]);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `${data.imageUrl}` : ""}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.commentsCount}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock items={data.comments} isLoading={isLoading}>
        {isAuth ? (
          <AddComment
            postId={id}
            isCommentPublicated={isCommentPublicated}
            setIsCommentPublicated={setIsCommentPublicated}
          />
        ) : (
          <div style={{ padding: "1rem" }}>
            Для того щоб залишити коментар необхідно авторизуватись
          </div>
        )}
      </CommentsBlock>
    </>
  );
};
