import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const AUTH_URL = "http://localhost:3001";

const initialState = {
  user: {},
  status: "loading",
  error: null,
};

export const userLogin = createAsyncThunk("user/login", async (user) => {
  try {
    const res = await axios.post(`${AUTH_URL}/login`, user);
    return res.data;
  } catch (error) {
    console.error(error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.user = action.payload.data;
      state.status = "success";
      state.error = null;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.user = {};
      state.status = "failed";
      state.error = action.payload.error.message;
    });
  },
});

export const getUser = (state) => state.user.user;

export default userSlice.reducer;
