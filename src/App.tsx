import React, { Suspense, useEffect } from "react";
import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { fetchUserData } from "./redux/stores/user/user.slice";
import { useAppDispatch } from "./redux/redux.hooks";
const Home = React.lazy(() => import("./pages/Home/home"));
const FullPost = React.lazy(() => import("./pages/FullPost/full-post"));
const Registration = React.lazy(
  () => import("./pages/Registration/registration")
);
const AddEditPost = React.lazy(() => import("./pages/AddPost/add-edit-post"));
const Login = React.lazy(() => import("./pages/Login/login"));

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:postId" element={<FullPost />} />
            <Route path="/posts/:postId/edit" element={<AddEditPost />} />
            <Route path="/add-post" element={<AddEditPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </Routes>
        </Suspense>
      </Container>
    </>
  );
}

export default App;
