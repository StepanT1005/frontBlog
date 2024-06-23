/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertColor } from "@mui/material";
import { NotificationState } from "./notification.types";

const initialState: NotificationState = {
  message: "",
  severity: "error",
  open: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<{ message: string; severity?: AlertColor }>
    ) => {
      state.message = action.payload.message;
      state.severity = action.payload.severity || "error";
      state.open = true;
    },
    clearNotification: (state) => {
      state.message = "";
      state.open = false;
    },
  },
});

export const { showNotification, clearNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
