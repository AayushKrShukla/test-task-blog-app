import { Link, useParams } from "react-router-dom";
import { fetchBlogById, fetchBlogsStatus } from "./blogsSlice";
import { useSelector } from "react-redux";

const ViewBlog = () => {
  const { blogId } = useParams();
  console.log("blogId", blogId);

  const blogsStatus = useSelector(fetchBlogsStatus);
  const blog = useSelector((state) => fetchBlogById(state, blogId));

  if (blogsStatus === "loading") {
    return <h1>Loading</h1>;
  }

  if (!blog || blogsStatus === "failed") {
    return <h1>This blog does not exists</h1>;
  }

  return (
    <div className="mt-20 flex justify-center items-center">
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
          className="inline-flex font-medium items-center text-blue-600 hover:underline"
          to={`/blog/edit/${blog._id}`}
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default ViewBlog;
