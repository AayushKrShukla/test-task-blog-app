// import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import AddBlog from "./features/blogs/AddBlog";
import BlogsList from "./features/blogs/BlogsList";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./features/user/Login";
import Logout from "./features/user/Logout";
import Signup from "./features/user/Signup";
import EditBlog from "./features/blogs/EditBlog";
import ViewBlog from "./features/blogs/ViewBlog";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/logout" element={<Logout />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<BlogsList />} />
        <Route path="blog">
          <Route index element={<AddBlog />}></Route>
          <Route path=":blogId" element={<ViewBlog />}></Route>
          <Route path="edit/:blogId" element={<EditBlog />}></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
