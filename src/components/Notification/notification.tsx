import { Snackbar, Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { useAppSelector, clearNotification } from "@/redux";

export const Notification = () => {
  const dispatch = useDispatch();
  const { message, severity, open } = useAppSelector(
    (state) => state.notification
  );

  const handleClose = () => {
    dispatch(clearNotification());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{ width: "50%" }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{ width: "100%", fontSize: "1.2em" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
