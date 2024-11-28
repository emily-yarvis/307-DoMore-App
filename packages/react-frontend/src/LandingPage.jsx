import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to DoMore</h1>
      <p className="text-lg mb-6">Your ultimate task management app.</p>
      <Link to="/login" className="text-blue-500 underline mb-2">
        Log In
      </Link>
      <Link to="/signup" className="text-blue-500 underline">
        Sign Up
      </Link>
    </div>
  );
};

export default LandingPage;
