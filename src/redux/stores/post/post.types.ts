import { UserData } from "../user/user.types";

export type PostData = {
  _id: string;
  title: string;
  text: string;
  tags: string[];
  viewsCount: number;
  imageUrl?: string;
  user: UserData;
  likes?: number;
  createdAt: string;
  comments: string[];
};

export type PostState = {
  postData: PostData | null;
  isLoading: boolean;
  error: any;
};
