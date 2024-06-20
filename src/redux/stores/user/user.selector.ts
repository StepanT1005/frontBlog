import { RootState } from "../../store";

export const selectUserData = (state: RootState) => state.user.userData;
export const getIsAuth = (state: RootState) => Boolean(state.user.userData);
