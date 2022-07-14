import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchComments, fetchPosts, fetchTags } from "../redux/slices/posts";
import { Link, useParams } from "react-router-dom";

export const Home = () => {
  const dispatch = useDispatch();
  const { tag } = useParams();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags, commentaries } = useSelector((state) => state.posts);
  const { direction } = useParams();

  const rendersPosts =
    direction === "popular"
      ? [...posts.items].sort((a, b) => b.viewsCount - a.viewsCount)
      : direction === "new"
      ? [...posts.items].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      : Boolean(tag)
      ? posts.items.filter((el) => el.tags.includes(tag))
      : [...posts.items].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
  const underline = direction === "popular" ? 1 : 0;
  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";
  const isCommentariesLoading = commentaries.status === "loading";
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
    dispatch(fetchComments());
  }, [direction]);
  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={underline}
        aria-label="basic tabs example"
      >
        <Link to="/sort/new">
          <Tab label="Нові" />
        </Link>
        <Link to="/sort/popular">
          <Tab label="Популярні" />
        </Link>
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : rendersPosts).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                id={obj._id}
                title={obj.title}
                imageUrl={
                  obj.imageUrl
                    ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}`
                    : ""
                }
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={obj.commentsCount}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={commentaries.items}
            isLoading={isCommentariesLoading}
            isHomePage={true}
          />
        </Grid>
      </Grid>
    </>
  );
};
