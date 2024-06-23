import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./stores/posts/posts.slice";
import userReducer from "./stores/user/user.slice";
import postReducer from "./stores/post/post.slice";
import commentsReducer from "./stores/comments/comments.slice";
import notificationReducer from "./stores/notification/notification.slice";

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    posts: postsReducer,
    comments: commentsReducer,
    notification: notificationReducer,
  },
});

export default store;
