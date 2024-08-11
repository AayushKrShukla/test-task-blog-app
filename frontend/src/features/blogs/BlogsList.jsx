import { useSelector } from "react-redux";
import { fetchAllBlogs, fetchBlogsError, fetchBlogsStatus } from "./blogsSlice";
import { Link } from "react-router-dom";

const BlogsList = () => {
  const blogs = useSelector(fetchAllBlogs);
  const blogsStatus = useSelector(fetchBlogsStatus);
  const error = useSelector(fetchBlogsError);

  const renderContent = () => {
    if (blogsStatus === "loading" || blogsStatus === "ideal") {
      return <p>Loading</p>;
    } else if (blogsStatus === "success") {
      if (!blogs?.length) {
        return <div>No blogs to show. Please create a new blog</div>;
      }
      return blogs.map((blog) => {
        return (
          <div
            key={blog._id}
            className="w-96 max-w-sm m-2 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {blog.title || "No title"}
            </h5>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              {blog.content}
            </p>
            <Link
              className="me-4 inline-flex font-medium items-center text-blue-600 hover:underline"
              to={`/blog/${blog._id}`}
            >
              View
            </Link>
            <Link
              className="inline-flex font-medium items-center text-blue-600 hover:underline"
              to={`/blog/edit/${blog._id}`}
            >
              Edit
            </Link>
          </div>
        );
      });
    } else if (blogsStatus === "failed") {
      return <p>Error: {error?.message || "Something went wrong"}</p>;
    }
  };

  return (
    <section className="blogs-list p-4 flex flex-col items-center">
      {renderContent()}
    </section>
  );
};

export default BlogsList;
