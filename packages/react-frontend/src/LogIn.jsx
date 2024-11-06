// src/LogIn.jsx
import React, { useState } from 'react';

const LogIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Log-In data:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-gray-200 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-2">Log In</h2>
        <p className="text-center text-sm mb-6">
          don't have an account? <a href="/signup" className="underline">sign up</a>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none"
              placeholder="email address"
            />
          </div>
          <div className="mb-2 flex items-center">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none"
              placeholder="password"
            />
            <button type="button" className="ml-2 text-sm">show</button>
          </div>
          <div className="text-right mb-4">
            <a href="#" className="text-sm underline">forgot password?</a>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gray-400 text-white font-bold rounded mb-4"
          >
            log in
          </button>
          <div className="flex items-center mb-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-sm">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <button className="w-full py-2 bg-gray-300 text-black font-bold rounded">
            login with google?
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
