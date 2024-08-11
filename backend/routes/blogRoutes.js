import express from "express";
import { checkValidJwt } from "../controllers/authController.js";
import {
  checkLockOnBlog,
  createBlog,
  editBlog,
  fetchBlog,
  fetchBlogs,
  lockBlog,
} from "../controllers/blogController.js";

const router = express.Router();

router.use(checkValidJwt);

router.get("/", fetchBlogs);
router.get("/:id", fetchBlog);
router.post("/", createBlog);
router.patch("/lock/:id", checkLockOnBlog, lockBlog);
router.patch("/:id", checkLockOnBlog, editBlog);

export const blogRouter = router;
