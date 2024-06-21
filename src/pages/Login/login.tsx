import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import {
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import client from "../../api/api";
import { fetchUserData } from "../../redux/stores/user/user.slice";
import { useAppDispatch, useAppSelector } from "../../redux/redux.hooks";
import { getIsAuth } from "../../redux/stores/user/user.selector";
import styles from "./login.module.scss";

interface FormData {
  email: string;
  password: string;
}

export const Login = () => {
  const isAuth = useAppSelector(getIsAuth);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const onSubmit = async (formData: FormData) => {
    const { data } = await client.post("auth/login", formData);
    if (data.token) {
      localStorage.setItem("token", data.token);
      dispatch(fetchUserData());
    }
  };

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((prev) => !prev);
  }, []);

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper className={styles.root}>
      <Typography variant="h5" className={styles.title}>
        Account Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          fullWidth
          {...register("email", {
            required: "Please enter your email address",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address",
            },
          })}
          type="email"
        />
        <TextField
          className={styles.field}
          label="Password"
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          fullWidth
          {...register("password", { required: "Please enter your password" })}
          type={passwordVisibility ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {passwordVisibility ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          size="large"
          variant="contained"
          disabled={Object.keys(errors).length > 0}
        >
          Log In
        </Button>
      </form>
    </Paper>
  );
};

export default Login;
