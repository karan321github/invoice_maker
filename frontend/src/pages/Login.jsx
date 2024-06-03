// src/components/Login.js

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/actions/authAction";
import { useNavigate } from "react-router-dom";
import {
  selectError,
  selectIsLoading,
} from "../store/reducers/authReducers";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  

  const handleLogin = () => {
    dispatch(login({ email, password }));
    navigate("/products");
  };

  return (
    <div className="flex justify-evenly items-center h-screen">
      <div className="w-1/4 p-4 h-fit justify-evenly bg-transparent p-2 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="mb-5 text-red-500">{error}</p>}
        {isLoading && <p className="text-gray-500 mb-2">Loading...</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-2 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded-md"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-400 text-white py-2 rounded-md"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
