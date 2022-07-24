import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      avatarUrl: "",
    },
    mode: "onChange",
  });
  const onSubmit = async (values) => {
    const isEmpty = (str) => !str.trim(" ");
    if (isEmpty(values.avatarUrl)) {
      values.avatarUrl =
        "https://cdn-icons-png.flaticon.com/512/2644/2644580.png";
    }
    if (!isValid) return;
    const data = await dispatch(fetchRegister(values));
    if (!data.payload) {
      return alert("Не вдалось зареєструватись");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };
  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Створення аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("avatarUrl")}
          type="text"
          className={styles.field}
          label="Ссилка на аватар"
          fullWidth
        />
        <TextField
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register("fullName", { required: "Вкажіть і'мя та фамілію" })}
          type="text"
          className={styles.field}
          label="Повне ім'я"
          fullWidth
        />
        <TextField
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Вкажіть електронну адресу" })}
          type="email"
          className={styles.field}
          label="E-Mail"
          fullWidth
        />
        <TextField
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Вкажіть пароль" })}
          type="password"
          className={styles.field}
          label="Пароль"
          fullWidth
        />
        <Button type="sumbit" size="large" variant="contained" fullWidth>
          Зареєструватись
        </Button>
      </form>
    </Paper>
  );
};
