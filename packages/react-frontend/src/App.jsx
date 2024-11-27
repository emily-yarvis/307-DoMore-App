import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

// import Table from "./Table";
// import Form from "./Form";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Home from "./Home";
import NewTask from "./NewTask";
import NewList from "./NewList";

// Commented out as they are unused
// const [characters, setCharacters] = useState([]);

function App() {
  const API_PREFIX = "domoreapp-e5ecc0h3d6dzh3hz.westus-01.azurewebsites.net";
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");
  const [characters, setCharacters] = useState([]);

  function fetchUsers() {
    const promise = fetch(
      "https://domoreapp-e5ecc0h3d6dzh3hz.westus-01.azurewebsites.net/users",
    );
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => (res.status === 200 ? res.json() : undefined))
      .then((json) => {
        if (json) {
          setCharacters(json["users_list"]);
        } else {
          setCharacters(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  function loginUser(creds) {
    const promise = fetch(`${API_PREFIX}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((payload) => setToken(payload.token));
          setMessage(`Login successful; auth token saved`);
        } else {
          setMessage(`Login Error ${response.status}: ${response.data}`);
        }
      })
      .catch((error) => {
        setMessage(`Login Error: ${error}`);
      });

    return promise;
  }

  function signupUser(creds) {
    const promise = fetch(`${API_PREFIX}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    })
      .then((response) => {
        if (response.status === 201) {
          response.json().then((payload) => setToken(payload.token));
          setMessage(
            `Signup successful for user: ${creds.username}; auth token saved`,
          );
        } else {
          setMessage(`Signup Error ${response.status}: ${response.data}`);
        }
      })
      .catch((error) => {
        setMessage(`Signup Error: ${error}`);
      });

    return promise;
  }

  function addAuthHeader(otherHeaders = {}) {
    if (token === INVALID_TOKEN) {
      return otherHeaders;
    } else {
      return {
        ...otherHeaders,
        Authorization: `Bearer ${token}`,
      };
    }
  }

  function fetchUsers() {
    const promise = fetch(`${API_PREFIX}/users`, {
      headers: addAuthHeader(),
    });

    return promise;
  }

  return (
    <Router>
      <div className = "">
        {/* Navigation bar */}
        <nav className="flex items-center justify-start py-4 px-4  bg-gray-200 border-b border-gray-300">
          {/* Profile (non-link item) */}
          <div className="flex gap-2 items-center bg-white py-2 px-4 border border-blue-500 text-blue-500 font-semibold rounded-md mr-4">
            <div>
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                class="w-4 h-4 rounded-full border-2  border-gray-300 shadow-md"
              />
            </div>
            <div>Profile</div>
          </div>

          {/* Links */}
          <Link
            to="/"
            className="py-2 px-4 border bg-white border-blue-500 text-blue-500 font-semibold rounded-md mr-4"
          >
            Home
          </Link>
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

        {/* Content */}
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/signup"
              element={<SignUp handleSubmit={signupUser} />}
            />
            <Route path="/login" element={<LogIn handleSubmit={loginUser} />} />
            <Route path="/newTask" element={<NewTask />} />
            <Route path="/newList" element={<NewList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
