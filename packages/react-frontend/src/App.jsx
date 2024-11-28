import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import React, { useState } from "react";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import LandingPage from "./LandingPage";
import NewTask from "./NewTask";
import NewList from "./NewList";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  const API_PREFIX = "https://domoreapp-e5ecc0h3d6dzh3hz.westus-01.azurewebsites.net";
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");

  function loginUser(creds) {
    return fetch(`${API_PREFIX}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((payload) => setToken(payload.token));
          setMessage("Login successful; auth token saved");
        } else {
          setMessage(`Login Error ${response.status}: ${response.data}`);
        }
      })
      .catch((error) => {
        setMessage(`Login Error: ${error}`);
      });
  }

  function signupUser(creds) {
    return fetch(`${API_PREFIX}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    })
      .then((response) => {
        if (response.status === 201) {
          response.json().then((payload) => setToken(payload.token));
          setMessage("Signup successful; auth token saved");
        } else {
          setMessage(`Signup Error ${response.status}: ${response.data}`);
        }
      })
      .catch((error) => {
        setMessage(`Signup Error: ${error}`);
      });
  }

  return (
    <Router>
      <div>
        {/* Navigation bar */}
        <nav className="flex items-center justify-start py-4 px-4 bg-gray-200 border-b border-gray-300">
          {/* Profile Section */}
          <div className="flex gap-2 items-center bg-white py-2 px-4 border border-blue-500 text-blue-500 font-semibold rounded-md mr-4">
            <div>
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="w-4 h-4 rounded-full border-2 border-gray-300 shadow-md"
              />
            </div>
            <div>Profile</div>
          </div>

          {/* Links */}
          <Link
            to="/signup"
            className="py-2 px-4 border bg-white border-blue-500 text-blue-500 font-semibold rounded-md mr-4"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="py-2 px-4 border bg-white border-blue-500 text-blue-500 font-semibold rounded-md mr-4"
          >
            Log In
          </Link>
        </nav>

        {/* Routes */}
        <div className="p-4">
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Authentication Routes */}
            <Route path="/signup" element={<SignUp handleSubmit={signupUser} />} />
            <Route path="/login" element={<LogIn handleSubmit={loginUser} />} />

            {/* Protected Routes */}
            <Route path="/newTask" element={<ProtectedRoute><NewTask /></ProtectedRoute>} />
            <Route path="/newList" element={<ProtectedRoute><NewList /></ProtectedRoute>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
