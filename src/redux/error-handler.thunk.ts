import { createAsyncThunk } from "@reduxjs/toolkit";
import { showNotification } from "@/redux";
import axios from "axios";

type ServerError = {
  message: string;
};

export const handleApiError = createAsyncThunk(
  "errorHandler/handleApiError",
  async (error: unknown, { dispatch }) => {
    let errorMessage = "An unknown error occurred";

    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
        const serverError = error.response.data as ServerError;
        errorMessage = serverError.message || "Server error occurred";
      } else if (error.request) {
        console.error("Network Error:", error.request);
        errorMessage = "Network error. Please try again later.";
      } else {
        console.error("Error:", error.message);
        errorMessage = error.message || "An unknown error occurred";
      }
    } else {
      console.error("Error:", error);
    }
    dispatch(showNotification({ message: errorMessage, severity: "error" }));
    return errorMessage;
  }
);
