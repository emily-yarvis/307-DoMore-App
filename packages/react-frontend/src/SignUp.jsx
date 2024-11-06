// src/SignUp.jsx
import React, { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign-Up data:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-gray-200 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-2">Sign Up</h2>
        <p className="text-center text-sm mb-6">
          have an account already? <a href="/login" className="underline">log in</a>
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
          <div className="mb-4 flex items-center">
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
          <button
            type="submit"
            className="w-full py-2 bg-gray-400 text-white font-bold rounded mb-4"
          >
            sign up
          </button>
          <div className="flex items-center mb-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-sm">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <button className="w-full py-2 bg-gray-300 text-black font-bold rounded">
            sign up with google?
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
