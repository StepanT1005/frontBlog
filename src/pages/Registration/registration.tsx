import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Navigate } from "react-router-dom";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";
import { PhotoCamera, Close } from "@mui/icons-material";
import styles from "./registration.module.scss";
import client from "@/api/api";
import {
  fetchUserData,
  useAppDispatch,
  useAppSelector,
  getIsAuth,
  handleApiError,
} from "@/redux";

type FormData = {
  username: string;
  email: string;
  password: string;
};

const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];

const Registration = () => {
  const isAuth = useAppSelector(getIsAuth);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!isValid) {
      alert("One or more fields are invalid");
      return;
    }
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      const response = await client.post("auth/register", formData);
      const { token } = response.data;
      if (token) {
        window.localStorage.setItem("token", token);
        dispatch(fetchUserData());
        return <Navigate to="/" />;
      }
      alert("Registration failed");
    } catch (error) {
      dispatch(handleApiError(error));
    }
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file && !allowedMimeTypes.includes(file.type)) {
      setAvatarError("Invalid file type. Only JPEG, PNG, and GIF are allowed.");
      setAvatar(null);
    } else {
      setAvatarError(null);
      setAvatar(file);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper className={styles.root}>
      <Typography variant="h5" className={styles.title}>
        Create Account
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.avatarContainer}>
          {avatar && (
            <div className={styles.avatarWrapper}>
              <Avatar
                src={URL.createObjectURL(avatar)}
                sx={{ width: 100, height: 100 }}
              />
              <IconButton
                className={styles.removeAvatarButton}
                onClick={() => setAvatar(null)}
              >
                <Close />
              </IconButton>
            </div>
          )}
          {!avatar && (
            <>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="avatar-upload"
                type="file"
                onChange={handleAvatarChange}
              />
              <label htmlFor="avatar-upload">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </>
          )}
          {avatarError && (
            <Typography color="error" variant="body2">
              {avatarError}
            </Typography>
          )}
        </div>
        <TextField
          {...register("username", {
            required: "Full Name or Nickname is required",
          })}
          type="text"
          className={styles.field}
          label="Full Name or Nickname"
          error={Boolean(errors.username)}
          helperText={errors.username?.message}
          fullWidth
        />
        <TextField
          {...register("email", { required: "Email is required" })}
          type="email"
          className={styles.field}
          label="Email"
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          fullWidth
        />
        <TextField
          {...register("password", { required: "Password is required" })}
          type="password"
          className={styles.field}
          label="Password"
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          fullWidth
        />
        <Button
          type="submit"
          size="large"
          variant="contained"
          disabled={!isValid}
        >
          Register
        </Button>
      </form>
    </Paper>
  );
};

export default Registration;
