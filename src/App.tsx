import React, { Suspense, useEffect } from "react";
import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";
import { Header, Notification } from "./components";
import { fetchUserData, useAppDispatch } from "@/redux";
import { ErrorBoundary } from "./ErrorBoundary/error-boundary";
import ErrorPage from "./ErrorBoundary/error-page";

const Home = React.lazy(() => import("./pages/Home/home"));
const FullPost = React.lazy(() => import("./pages/FullPost/full-post"));
const Registration = React.lazy(
  () => import("./pages/Registration/registration")
);
const AddEditPost = React.lazy(() => import("./pages/AddPost/add-edit-post"));
const Login = React.lazy(() => import("./pages/Login/login"));

function App() {
  const dispatch = useAppDispatch();
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(fetchUserData());
    }
  }, [dispatch, token]);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Suspense fallback={<div>Loading...</div>}>
          <Notification />
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posts/:postId" element={<FullPost />} />
              <Route path="/posts/:postId/edit" element={<AddEditPost />} />
              <Route path="/add-post" element={<AddEditPost />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/error" element={<ErrorPage />} />
            </Routes>
          </ErrorBoundary>
        </Suspense>
      </Container>
    </>
  );
}

export default App;
