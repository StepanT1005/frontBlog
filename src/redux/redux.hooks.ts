import {
  useDispatch,
  useSelector,
  useStore,
  type TypedUseSelectorHook,
} from "react-redux";
import { AppDispatch, AppStore, RootState } from "./store";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;

type ThunkApiConfig = {
  state: RootState;
  dispatch: AppDispatch;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rejectValue: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extra: any;
};

export const createAppAsyncThunk = createAsyncThunk.withTypes<ThunkApiConfig>();
