import { AlertColor } from "@mui/material";

export type NotificationState = {
  message: string;
  severity: AlertColor;
  open: boolean;
};
