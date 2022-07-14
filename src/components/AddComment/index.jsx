import React, { useEffect, useState } from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import axios from "../../axios";

export const AddComment = ({
  isCommentPublicated,
  setIsCommentPublicated,
  postId,
}) => {
  const userData = useSelector((state) => state.auth.data);
  const [commentText, setCommentText] = useState("");
  const commentId = postId + new Date().toISOString();

  const handleCommentAdd = async () => {
    try {
      const comment = {
        user: {
          fullName: userData.fullName,
          avatarUrl: userData.avatarUrl,
        },
        text: commentText,
        postId,
        commentId,
      };
      axios.patch(`/posts/${postId}/comments`, comment);
      setIsCommentPublicated(true);
      setCommentText("");
    } catch (err) {
      console.warn(err);
      alert("Помилка при створенні коментаря");
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src={userData.avatarUrl} />
        <div className={styles.form}>
          <TextField
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            label="Написати коментар"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button onClick={handleCommentAdd} variant="contained">
            Відправити
          </Button>
        </div>
      </div>
    </>
  );
};
