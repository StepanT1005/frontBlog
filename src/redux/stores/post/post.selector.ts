import { RootState } from "../../store";

export const selectPostData = (state: RootState) => state.post.postData;
