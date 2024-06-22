import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import client from "../../../api/api";
import { createAppAsyncThunk } from "../../redux.hooks";
import { PaginationData, PostsState } from "./posts.types";

export const fetchPosts = createAppAsyncThunk(
  "posts/fetchPosts",
  async (paginationData: PaginationData, thunkAPI) => {
    const { page, limit, sortOrder } = paginationData;
    try {
      const { data } = await client.get("/posts", {
        params: {
          page,
          limit,
          sort: sortOrder,
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState: PostsState = {
  postsData: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  total: 0,
  limit: 10,
  sortOrder: "new",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    setSortOrder(state, action: PayloadAction<string>) {
      state.sortOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postsData = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = true;
        state.error = JSON.stringify(action.payload);
      });
  },
});

export const { setPage, setLimit, setSortOrder } = postsSlice.actions;
export default postsSlice.reducer;
