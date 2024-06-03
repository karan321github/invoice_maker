// src/features/authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const storedAuthState = JSON.parse(localStorage.getItem("authState"));

export const authSlice = createSlice({
  name: "auth",
  initialState: storedAuthState || initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = null;
      localStorage.setItem("authState", JSON.stringify(state));
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    signupStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = null;
      localStorage.setItem("authState", JSON.stringify(state));
    },
    signupFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = null;
      localStorage.removeItem("authState");
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  logout,
} = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
