import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBlog } from "./blogsSlice";

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);

  const canSave = [title, content].every(Boolean);

  const onCreate = () => {
    if (canSave) {
      try {
        dispatch(createBlog({ title, content }));
        setTitle("");
        setContent("");
        navigate("/");
      } catch (error) {
        console.error("Failed to create blog", error);
      }
    }
  };

  return (
    <section className="flex mt-8 justify-center">
      <div className="w-80 border-2 p-4">
        <h2 className="text-center">Add a New Blog</h2>
        <form className="flex flex-col gap-10 mt-10">
          <label>
            Title:
            <input
              type="text"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Title"
              value={title}
              onChange={onTitleChange}
              required
            />
          </label>

          <label>
            Content:
            <textarea
              id="blogContent"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
              value={content}
              onChange={onContentChange}
            ></textarea>
          </label>

          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={onCreate}
            disabled={!canSave}
          >
            Save This Blog
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddBlog;
