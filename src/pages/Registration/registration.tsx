import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import styles from "./registration.module.scss";
import client from "../../api/api";
import { fetchUserData } from "../../redux/stores/user/user.slice";
import { useAppDispatch, useAppSelector } from "../../redux/redux.hooks";
import { getIsAuth } from "../../redux/stores/user/user.selector";

interface FormData {
  username: string;
  email: string;
  password: string;
}

export const Registration = () => {
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

  const onSubmit = async (data: FormData) => {
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
      const { data } = await client.post("auth/register", formData);
      if (data.token) {
        window.localStorage.setItem("token", data.token);
        dispatch(fetchUserData());
        return <Navigate to="/" />;
      }
      alert("Registration failed");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed");
    }
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setAvatar(file);
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
        <div className={styles.avatar}>
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
          {avatar && (
            <Avatar
              src={URL.createObjectURL(avatar)}
              sx={{ width: 100, height: 100 }}
            />
          )}
        </div>
        <TextField
          {...register("username")}
          type="text"
          className={styles.field}
          label="Full Name or Nickname"
          error={Boolean(errors.username)}
          helperText={errors.username?.message}
          required
        />
        <TextField
          {...register("email")}
          type="email"
          className={styles.field}
          label="Email"
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          required
        />
        <TextField
          {...register("password")}
          type="password"
          className={styles.field}
          label="Password"
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          required
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
