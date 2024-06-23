import { useState, ChangeEvent, useEffect } from "react";

import { TextField, Avatar, Button } from "@mui/material/";
import styles from "./add-comment.module.scss";
import { useAppSelector } from "@/redux";
import io, { Socket } from "socket.io-client";
import client, { BASE_URL, DEFAULT_AVATAR } from "@/api/api";

type AddCommentProps = {
  postId: string;
};

export const AddComment = (props: AddCommentProps) => {
  const { postId } = props;
  const userData = useAppSelector((state) => state.user.userData);
  const [text, setText] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(BASE_URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleCommentAdd = async () => {
    if (!socket) return;

    try {
      const { data } = await client.post(`/comments/`, {
        postId,
        content: text,
      });

      socket.emit("newComment", data);
      setText("");
    } catch (err) {
      console.error("Failed to add comment", err);
      alert("Error adding comment");
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={`${BASE_URL}${userData?.avatarUrl}` || DEFAULT_AVATAR}
        />
        <div className={styles.form}>
          <div>
            <TextField
              value={text}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setText(e.target.value)
              }
              label="Write a comment"
              variant="outlined"
              fullWidth
              maxRows={5}
              multiline
            />
          </div>
          <Button onClick={handleCommentAdd} variant="contained">
            Send
          </Button>
        </div>
      </div>
    </>
  );
};
