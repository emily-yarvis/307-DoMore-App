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
  const API_PREFIX = "domoreapp-e5ecc0h3d6dzh3hz.westus-01.azurewebsites.net"
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");
  const [characters, setCharacters] = useState([]);

  function fetchUsers() {
    const promise = fetch("https://domoreapp-e5ecc0h3d6dzh3hz.westus-01.azurewebsites.net/users");
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
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    })
      .then((response) => {
        if (response.status === 200) {
          response
            .json()
            .then((payload) => setToken(payload.token));
          setMessage(`Login successful; auth token saved`);
        } else {
          setMessage(
            `Login Error ${response.status}: ${response.data}`
          );
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
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    })
      .then((response) => {
        if (response.status === 201) {
          response
            .json()
            .then((payload) => setToken(payload.token));
          setMessage(
            `Signup successful for user: ${creds.username}; auth token saved`
          );
        } else {
          setMessage(
            `Signup Error ${response.status}: ${response.data}`
          );
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
        Authorization: `Bearer ${token}`
      };
    }
  }

  function fetchUsers() {
    const promise = fetch(`${API_PREFIX}/users`, {
      headers: addAuthHeader()
    });
  
    return promise;
  }


  return (
    <Router>
      <div className="container">
        <nav className="my-4">
          <Link
            to="/"
            className="w-full py-2 px-2 border border-blue-500 text-blue-500 font-semibold rounded-md mr-2"
          >
            Home
          </Link>
          <Link
            to="/signup"
            className="w-full py-2 px-2 border border-blue-500 text-blue-500 font-semibold rounded-md mr-2"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="w-full py-2 px-2 border border-blue-500 text-blue-500 font-semibold rounded-md mr-2"
          >
            Log In
          </Link>
          <hr className="border-t border-gray-300 mt-4" />
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp handleSubmit={signupUser}/>} />
          <Route path="/login" element={<LogIn handleSubmit={loginUser} />} />
          <Route path="/newTask" element={<NewTask />} />
          <Route path="/newList" element={<NewList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
