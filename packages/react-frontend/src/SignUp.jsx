import React, { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign-Up data:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-sm p-8 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-2">Sign Up</h2>
        <p className="text-center text-sm mb-6">
          have an account already? <a href="/login" className="underline text-blue-500">log in</a>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-gray-200 text-gray-800 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 bg-gray-200 text-gray-800 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-sm text-blue-500 cursor-pointer"
            >
              {showPassword ? "hide" : "show"}
            </span>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md mb-4"
          >
            sign up
          </button>
          <div className="flex items-center mb-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-xs">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <button className="w-full py-2 border border-blue-500 text-blue-500 font-semibold rounded-md">
            sign up with google/canvas
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
