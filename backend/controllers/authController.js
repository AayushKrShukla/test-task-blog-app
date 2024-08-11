import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { promisify } from "util";
import { catchAsync } from "../utils/catchAsync.js";
import CustomError from "../utils/customError.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: process.env.JWT_TOKEN_EXPIRES_IN,
  });
};

const createJwtToken = ({ user, statusCode, req, res }) => {
  const token = signToken(user._id);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const register = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  createJwtToken({ user: newUser, statusCode: 201, req, res });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new CustomError("Please provide email and Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (
    !user ||
    !(await user.comparePassword({
      userPassword: user.password,
      candidatePassword: password,
    }))
  ) {
    return next(new CustomError("Incorrect Email or Password", 401));
  }

  createJwtToken({ user, statusCode: 201, req, res });
});

export const logout = (req, res) => {
  // if we have session storage we will clear it here
  res.status(200).json({ status: "success" });
};

export const checkValidJwt = catchAsync(async (req, res, next) => {
  const authHeader = req?.headers?.authorization;
  const token = authHeader?.startsWith("Bearer") && authHeader.split(" ")[1];

  if (!token) {
    return next(new CustomError("You are not logged in!", 401));
  }

  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_TOKEN_SECRET
  );

  const currentUser = await User.findById(decodedToken.id);
  if (!currentUser) {
    return next(new CustomError("The token is invalid", 401));
  }

  req.user = currentUser;
  next();
});
