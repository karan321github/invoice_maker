// src/components/Login.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/actions/authAction';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    // Your login logic here (e.g., API call)
    // Assuming successful login, dispatch action to update state
    dispatch(login({ email, password }));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/3 bg-gray-100 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
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
        <button onClick={handleLogin} className="w-full bg-blue-500 text-white py-2 rounded-md">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
