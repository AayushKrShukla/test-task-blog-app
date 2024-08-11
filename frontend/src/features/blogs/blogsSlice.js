import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const BLOGS_URL = "http://localhost:3001/blog";

const initialState = {
  blogs: [],
  status: "idle",
  error: null,
};

export const getAuthHeader = () => {
  return {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  };
};

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  try {
    const res = await axios.get(BLOGS_URL, {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (error) {
    throw error.message;
  }
});

export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (blogDetails) => {
    try {
      const res = await axios.post(BLOGS_URL, blogDetails, {
        headers: getAuthHeader(),
      });
      return res.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const editBlog = createAsyncThunk(
  "blogs/editBlog",
  async (blogDetails) => {
    try {
      const res = await axios.patch(
        `${BLOGS_URL}/${blogDetails.id}`,
        blogDetails,
        {
          headers: getAuthHeader(),
        }
      );
      return res.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const lockBlog = async (blogId) => {
  return axios.patch(
    `${BLOGS_URL}/lock/${blogId}`,
    {},
    {
      headers: getAuthHeader(),
    }
  );
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      state.status = "success";
      state.blogs = action.payload.data.blogs;
    });
    builder.addCase(fetchBlogs.rejected, (state, action) => {
      state.status = "failed";
      state.blogs = [];
      state.error = action.error.message;
    });

    builder.addCase(createBlog.fulfilled, (state, action) => {
      state.blogs = [action.payload.data.newBlog, ...state.blogs];
    });

    builder.addCase(editBlog.fulfilled, (state, action) => {
      state.blogs = [
        action.payload.data.updatedBlog,
        ...state.blogs.filter(
          (blog) => blog._id !== action.payload.data.updatedBlog._id
        ),
      ];
    });
  },
});

export const fetchAllBlogs = (state) => state.blogs.blogs;
export const fetchBlogsStatus = (state) => state.blogs.status;
export const fetchBlogsError = (state) => state.blogs.error;
export const fetchBlogById = (state, id) => {
  return state.blogs.blogs.find((blog) => blog._id === id);
};

export default blogsSlice.reducer;
