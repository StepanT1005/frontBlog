import { UserData } from "../user/user.types";

export type Comment = {
  _id: string;
  content: string;
  post: string;
  likes: [];
  createdAt: string;
  user: UserData;
};

export type CommentState = {
  comments: Comment[];
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
};
