import { Button, Container } from "@mui/material/";
import { Link } from "react-router-dom";
import styles from "./header.module.scss";
import { useAppDispatch, useAppSelector, getIsAuth, clearUser } from "@/redux";

export const Header = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(getIsAuth);

  const onClickLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      dispatch(clearUser());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>Blog</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Create Post</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Create Account</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
