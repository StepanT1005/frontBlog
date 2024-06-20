import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import client from "../../../api/api";
import { createAppAsyncThunk } from "../../redux.hooks";
import { Comment, CommentState } from "./comments.types";

export const fetchComments = createAppAsyncThunk(
  "comments/fetchComments",

  async (postId: string, thunkAPI) => {
    try {
      const { data } = await client.get(`/comments/${postId}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState: CommentState = {
  comments: [],
  isLoading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    commentAdded(state, action: PayloadAction<Comment>) {
      state.comments.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    //// Get Comment
    builder.addCase(fetchComments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.error = JSON.stringify(action.payload);
      state.isLoading = false;
    });
  },
});

export const { commentAdded } = commentsSlice.actions;
export default commentsSlice.reducer;
