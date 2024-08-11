import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchBlogs } from "../features/blogs/blogsSlice";

const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className="App">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
