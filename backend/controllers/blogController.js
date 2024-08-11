import { Blog } from "../models/Blog.js";
import { agenda } from "../server.js";
import { catchAsync } from "../utils/catchAsync.js";
import CustomError from "../utils/customError.js";

export const fetchBlogs = catchAsync(async (req, res, next) => {
  const blogs = await Blog.find().populate({
    path: "lastEditedBy",
    select: "name",
  });
  res.status(200).json({
    data: {
      blogs,
    },
  });
});

export const fetchBlog = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new CustomError("You need to provide an id"));
  }
  const blog = await Blog.findById(id).populate({
    path: "lastEditedBy",
    select: "name",
  });
  if (!blog) {
    return next(new CustomError("Blog does not exist", 404));
  }
  res.status(200).json({
    data: {
      blog,
    },
  });
});

export const createBlog = catchAsync(async (req, res, next) => {
  const { title, content } = req.body;
  const user = req.user;

  const newBlog = await Blog.create({ title, content, lastEditedBy: user });
  res.status(201).json({
    status: "success",
    data: {
      newBlog,
    },
  });
});

export const editBlog = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new CustomError("You need to provide an id"));
  }

  const { content, title } = req.body;
  const user = req.user;

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    {
      content,
      title,
      lastEditedBy: user.id,
      lockedAt: null,
      lockedBy: null,
      isLocked: false,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({ data: { updatedBlog } });
});

export const lockBlog = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new CustomError("You need to provide blog id", 400));
  }

  const blog = await Blog.findByIdAndUpdate(id, {
    lockedAt: Date.now(),
    lockedBy: req.user.id,
    isLocked: true,
  });

  await agenda.schedule("in 10 minutes", "unlock blog", { blogId: id });
  res.status(201).json({
    status: "locked successfully",
  });
});

export const unlockBlog = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new CustomError("You need to provide blog id", 400));
  }

  const blog = await Blog.findByIdAndUpdate(id, {
    lockedAt: undefined,
    lockedBy: undefined,
    isLocked: false,
  });
  res.status(201).json({
    status: "unlocked successfully",
  });
});

export const checkLockOnBlog = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = req.user;
  const blog = await Blog.findById(id);

  if (blog?.isLocked && !blog.lockedBy.equals(user._id)) {
    return res.status(401).json({
      message: "Blog is currently locked. Please try again later",
    });
  }
  next();
});
