export type UserData = {
  _id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type UserState = {
  userData: UserData | null;
  isLoading: boolean;
  error: any;
};
