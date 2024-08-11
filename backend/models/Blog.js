// Create a blog model with fields: title, content, lastEditedBy,
//isLocked, lockedBy, lockedAt.

import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  lastEditedBy: {
    type: Schema.ObjectId,
    ref: "User",
    required: [true, "Blog must belong to a user"],
  },
  isLocked: {
    type: Boolean,
    default: false,
  },
  lockedBy: {
    type: Schema.ObjectId,
    ref: "User",
  },
  lockedAt: {
    type: Date,
  },
});

export const Blog = mongoose.model("Blog", blogSchema);
