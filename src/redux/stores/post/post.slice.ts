import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import client from "../../../api/api";
import { createAppAsyncThunk } from "../../redux.hooks";
import { PostData, PostState } from "./post.types";

export const fetchPost = createAppAsyncThunk(
  "posts/fetchPost",
  async (id: string, thunkAPI) => {
    try {
      const { data } = await client.get(`/posts/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchRemovePost = createAppAsyncThunk(
  "posts/fetchRemovePost",
  async (id: string, thunkApi) => {
    try {
      await client.delete(`posts/${id}`);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const initialState: PostState = {
  postData: null,
  isLoading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostData(state, action: PayloadAction<PostData | null>) {
      state.postData = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = JSON.stringify(action.payload);
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    clearPostData(state) {
      state.postData = null;
    },
  },
  extraReducers: (builder) => {
    //// Get Post
    builder.addCase(fetchPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.postData = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchPost.rejected, (state, action) => {
      state.error = JSON.stringify(action.payload);
      state.isLoading = false;
    });

    /// Delete Post
    builder.addCase(fetchRemovePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchRemovePost.fulfilled, (state) => {
      state.isLoading = false;
      state.postData = null;
    });
    builder.addCase(fetchRemovePost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = JSON.stringify(action.payload);
    });
  },
});

export const { setPostData, setError, setIsLoading, clearPostData } =
  postsSlice.actions;
export default postsSlice.reducer;
