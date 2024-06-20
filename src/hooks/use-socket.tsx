import { useEffect } from "react";
import io from "socket.io-client";
import { commentAdded, useAppDispatch, Comment } from "@/redux";
import { BASE_URL } from "@/api/api";

const useSocket = (postId) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const socket = io(BASE_URL);

    socket.emit("joinPost", postId);

    socket.on("commentAdded", (comment: Comment) => {
      dispatch(commentAdded(comment));
    });

    return () => {
      socket.emit("leavePost", postId);
      socket.off("commentAdded");
    };
  }, [postId, dispatch]);

  return null;
};

export default useSocket;
