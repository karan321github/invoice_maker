import axios from "axios";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  signupFailure,
  signupStart,
  signupSuccess,
} from "../reducers/authReducers";

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch(loginStart());
      const config = {
        "Content-Type": "application/json",
      };
      const loginUser = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password },
        config
      );
      console.log(loginUser);
      if (loginUser) {
        dispatch(loginSuccess(loginUser.data));
      }
    } catch (error) {
      dispatch(loginFailure("Login Failed"));
    }
  };

export const signUp =
  ({ name, email, password, address }) =>
  async (dispatch) => {
    dispatch(signupStart());
    try {
      const signUser = await axios.post(
        "http://localhost:5000/api/user/signup",
        {
          name,
          email,
          password,
          address,
        }
      );
      console.log(signUser);
      if (signUser) {
        dispatch(signupSuccess(signUser.data));
      }
    } catch (error) {
      dispatch(signupFailure("SignUp failed"));
    }
  };