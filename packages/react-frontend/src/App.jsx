import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Home from "./Home";
import NewTask from "./NewTask";
import NewList from "./NewList";

function App() {
  const API_PREFIX = "http://localhost:8000";
  const INVALID_TOKEN = "INVALID_TOKEN";

  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [users, setUsers] = useState([]);

  function removeOneCharacter(index) {
    const updated = lists.filter((list, i) => i !== index);
    setLists(updated);
  }

  function fetchCategories(currentUserId) {
    if (!currentUserId) {
      console.error("No userId provided for fetching categories.");
      return;
    }

    fetch(`${API_PREFIX}/categories/${currentUserId}`)
      .then((res) => res.json())
      .then((arr) => {
        const formattedCategories = arr.map((entry) => ({
          _id: entry._id,
          categoryName: entry.name,
        }));
        setCategories(formattedCategories);

        if (arr.length > 0) {
          fetchLists(arr[0]._id);
        }
      })
      .catch((error) => console.log("Error fetching categories:", error));
  }

  function fetchLists(categoryId) {
    console.log("Fetching lists for category:", categoryId);

    fetch(`${API_PREFIX}/lists/${categoryId}`)
      .then((res) => res.json())
      .then((arr) => {
        const formattedLists = arr.map((entry) => ({
          _id: entry._id,
          listName: entry.name,
        }));
        setLists(formattedLists);

        if (arr.length > 0) {
          fetchTasks(arr[0]._id);
        }
      })
      .catch((error) => console.log("Error fetching lists:", error));
  }

  function fetchTasks(listId) {
    console.log("Fetching tasks for list:", listId);

    fetch(`${API_PREFIX}/tasks/${listId}`)
      .then((res) => res.json())
      .then((arr) => {
        const formattedTasks = arr.map((entry) => ({
          _id: entry._id,
          taskName: entry.name,
        }));
        setTasks(formattedTasks);
      })
      .catch((error) => console.log("Error fetching tasks:", error));
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => (res.status === 200 ? res.json() : undefined))
      .then((json) => {
        if (json) {
          setUsers(json["users_list"]);
        } else {
          setUsers(null);
        }
      })
      .catch((error) => console.log("Error fetching users:", error));

    console.log("userId changed:", userId);
    if (userId) fetchCategories(userId);
  }, [userId]);

  function loginUser(creds) {
    fetch(`${API_PREFIX}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((payload) => {
            setToken(payload.token);
            setUserId(payload.userId);

            localStorage.setItem("authToken", payload.token);
            localStorage.setItem("userId", payload.userId);
            setMessage("Login successful; auth token saved");
          });
        } else {
          setMessage(`Login Error ${response.status}`);
        }
      })
      .catch((error) => setMessage(`Login Error: ${error}`));
  }

  function signupUser(creds) {
    fetch(`${API_PREFIX}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    })
      .then((response) => {
        if (response.status === 201) {
          response.json().then((payload) => {
            setToken(payload.token);
            setUserId(payload.userId);

            localStorage.setItem("authToken", payload.token);
            localStorage.setItem("userId", payload.userId);
            setMessage("Signup successful; auth token saved");
          });
        } else {
          setMessage(`Signup Error ${response.status}`);
        }
      })
      .catch((error) => setMessage(`Signup Error: ${error}`));
  }

  function fetchUsers() {
    return fetch(`${API_PREFIX}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav className="bg-gray-200 p-4 flex">
          <Link
            className="py-2 px-4 border bg-white border-blue-500 text-blue-500 font-semibold rounded-md mr-4"
            to="/"
          >
            Home
          </Link>
          <Link
            className="py-2 px-4 border bg-white border-blue-500 text-blue-500 font-semibold rounded-md mr-4"
            to="/signup"
          >
            Sign Up
          </Link>
          <Link
            className="py-2 px-4 border bg-white border-blue-500 text-blue-500 font-semibold rounded-md mr-4"
            to="/login"
          >
            Log In
          </Link>
        </nav>

        {/* Routes */}
        <div className="p-4">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  categoryData={categories}
                  listData={lists}
                  taskData={tasks}
                  removeCharacter={removeOneCharacter}
                  fetchLists={fetchLists}
                  fetchTasks={fetchTasks}
                />
              }
            />
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
