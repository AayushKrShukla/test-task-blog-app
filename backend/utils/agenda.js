import Agenda from "agenda";
import mongoose from "mongoose";
import { Blog } from "../models/Blog.js";

export const startAgenda = async (connectionString) => {
  const agenda = new Agenda({
    db: { address: connectionString, collection: "clearBlogJobs" },
  });

  agenda.define("unlock blog", async (job) => {
    const { blogId } = job.attrs.data;
    // const Blog = require("../models/Blog").default;

    await Blog.findByIdAndUpdate(blogId, {
      $set: { isLocked: false, lockedBy: null, lockedAt: null },
    });
  });

  await agenda.start();
  console.log("started agenda");
  return agenda;
};
