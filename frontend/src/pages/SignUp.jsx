// src/components/Signup.js

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../store/actions/authAction";
import { useNavigate } from "react-router-dom";
import {
  selectError,
  selectIsLoading,
  selectIsLoggedIn,
} from "../store/reducers/authReducers";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      setMessage("User created successfully");
    }
  }, [isLoggedIn]);

  const handleSignup = () => {
    dispatch(signUp({ name, email, password, address }));
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/4 h-fit bg-transparent p-2 rounded-sm border-black border-1 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <input
          type="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-2 rounded-md"
        />
        <input
          type="Email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded-md"
        />
        <input
          type="Address"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 mb-4 rounded-md"
        />
        <button
          onClick={handleSignup}
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          {isLoading ? "Signing Up..." : "Signup"}
        </button>
        {message && <p className="text-green-500 mt-2">{message}</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Signup;
