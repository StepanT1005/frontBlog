import { createSlice } from "@reduxjs/toolkit";
import client from "../../../api/api";
import { createAppAsyncThunk } from "../../redux.hooks";
import { UserState } from "./user.types";

const initialState: UserState = {
  userData: null,
  isLoading: false,
  error: null,
};

export const fetchUserData = createAppAsyncThunk(
  "user/fetchUserData",
  async (_, thunkAPI) => {
    try {
      const { data } = await client.get("auth/me");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser(state) {
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.error = JSON.stringify(action.payload);
      state.isLoading = false;
    });
  },
});

export default userSlice.reducer;
export const { clearUser } = userSlice.actions;
