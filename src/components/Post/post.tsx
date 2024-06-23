import React from "react";
import clsx from "clsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, fetchRemovePost } from "@/redux";

import { UserInfo } from "../UserInfo/user-info";
import { PostSkeleton } from "./post-skeleton";

import styles from "./post.module.scss";
import { BASE_URL } from "@/api/api";

type PostProps = {
  id: string;
  title: string;
  createdAt: string;
  imageUrl?: string;
  user: {
    avatarUrl?: string;
    username: string;
  };
  viewsCount: number;
  commentsCount?: number;
  tags: string[];
  children?: React.ReactNode;
  isFullPost?: boolean;
  isLoading?: boolean;
  isEditable?: boolean;
};

export const Post = (props: PostProps) => {
  const {
    id,
    title,
    createdAt,
    imageUrl,
    user,
    viewsCount,
    commentsCount = 0,
    tags,
    children,
    isFullPost = false,
    isLoading,
    isEditable,
  } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClickRemove = () => {
    if (window.confirm("Are you sure you want to delete the article?")) {
      dispatch(fetchRemovePost(id));
      navigate("/", { replace: true });
    }
  };

  if (isLoading) {
    return <PostSkeleton />;
  }

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      <UserInfo {...user} />
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          {isFullPost && (
            <IconButton onClick={onClickRemove} color="secondary">
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      )}
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={`${BASE_URL}/${imageUrl}`}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <div className={styles.indention}>
          <h2
            className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
          >
            {title}
          </h2>
          <ul className={styles.tags}>
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
          <div className={styles.dateComponent}>
            {new Date(createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};
