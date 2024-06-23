import { useEffect } from "react";
import { Tabs, Tab, Grid } from "@mui/material";
import {
  useAppDispatch,
  useAppSelector,
  fetchPosts,
  setSortOrder,
} from "@/redux";
import { Post, PostSkeleton, Sidebar } from "@/components";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useAppDispatch();
  const { postsData, isLoading, currentPage, sortOrder, limit } =
    useAppSelector((state) => state.posts);
  const currentUserId = useAppSelector((state) => state.user?.userData?._id);

  useEffect(() => {
    dispatch(fetchPosts({ page: currentPage, sortOrder, limit }));
  }, [dispatch, currentPage, sortOrder, limit]);

  const handleChangeSortOrder = (order: string) => {
    dispatch(setSortOrder(order));
  };

  return (
    <>
      <Tabs value={sortOrder === "new" ? 0 : 1} aria-label="basic tabs example">
        <Tab label="New" onClick={() => handleChangeSortOrder("new")} />
        <Tab label="Popular" onClick={() => handleChangeSortOrder("popular")} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          {isLoading
            ? Array.from({ length: 3 }, (_, index) => (
                <PostSkeleton key={index} />
              ))
            : postsData.map((post) => (
                <Link to={`/posts/${post._id}`} key={post._id}>
                  <Post
                    id={post._id}
                    title={post.title}
                    imageUrl={post.imageUrl || ""}
                    user={post.user}
                    createdAt={post.createdAt}
                    viewsCount={post.viewsCount}
                    commentsCount={post.comments?.length}
                    tags={post.tags}
                    isEditable={currentUserId === post.user._id}
                  />
                </Link>
              ))}
        </Grid>
        <Sidebar />
      </Grid>
    </>
  );
};

export default Home;
