// src/components/Signup.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, signUp } from '../store/actions/authAction';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const dispatch = useDispatch();

  const handleSignup = () => {
    dispatch(signUp({name , email , password , address}));
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
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded-md"
        />
         <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 rounded-md"
        />
         <input
          type="Address"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 mb-4 rounded-md"
        />
        <button onClick={handleSignup} className="w-full bg-blue-500 text-white py-2 rounded-md">
          Signup
        </button>
      </div>
    </div>
  );
};

export default Signup;
