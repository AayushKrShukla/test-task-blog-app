import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import mongoose from "mongoose";
import CustomError from "./utils/customError.js";
import { authRouter } from "./routes/authRoutes.js";
import { blogRouter } from "./routes/blogRoutes.js";
import errorHandler from "./utils/errorHandler.js";
import cors from "cors";
import morgan from "morgan";
import { startAgenda } from "./utils/agenda.js";

const isTest = process.env.NODE_ENV === "test";

const app = express();
!isTest && (await mongoose.connect(process.env.MONGODB_URI));
console.log(process.env.MONGODB_URI);

export const agenda = await startAgenda(process.env.MONGODB_URI);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

app.get("/", async (req, res) => {
  res.send("Hello World");
});

app.use(authRouter);
app.use("/blog", blogRouter);

app.all("*", (req, res, next) => {
  next(new CustomError(`Oops route ${req.originalUrl} does not exists`, 404));
});

app.use(errorHandler);

export const listener = app.listen(3001, () => {
  console.log("server is running on port 3000");
});

export default app;
