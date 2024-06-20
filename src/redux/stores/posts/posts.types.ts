import { UserData } from "../user/user.types";

export type Post = {
  _id: string;
  title: string;
  imageUrl?: string;
  user: UserData;
  createdAt: string;
  viewsCount: number;
  comments: string[];
  tags: string[];
  likes?: number;
};

export type PostsState = {
  postsData: Post[];
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
  total: number;
  limit: number;
  sortOrder: string;
  currentPage: number;
};

export type PaginationData = {
  page: number;
  limit: number;
  sortOrder: string;
};
