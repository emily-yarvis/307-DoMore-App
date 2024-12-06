import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

// import Table from "./Table";
// import Form from "./Form";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Home from "./Home";
import NewTask from "./NewTask";
import NewList from "./NewList";
import CategoryView from "./CategoryView";

// Commented out as they are unused
// const [characters, setCharacters] = useState([]);

function App() {
  const API_PREFIX =
    "https://domoreapp-e5ecc0h3d6dzh3hz.westus-01.azurewebsites.net";
  //const API_PREFIX = "Http://localhost:8000";
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);

  function removeOneCharacter(index) {
    console.log(lists[index]);
    const updated = lists.filter((list, i) => {
      return i !== index;
    });
    deleteUser(lists[index]).then(setLists(updated));
  }
  //function fetchUsers() {
  //  const promise = fetch(
  //    "https://domoreapp-e5ecc0h3d6dzh3hz.westus-01.azurewebsites.net/users",
  //  );
  //  return promise;
  //}

  function fetchCategories(currentUserId) {
  const promise = fetch(`${API_PREFIX}/categories/${currentUserId}`)
    .then((res) => res.json())
    .then((arr) => {
      // Map the categories to the required format
      const formattedCategories = arr.map((entry) => ({
        categoryName: entry.name, // Assuming `name` is the property that holds the category name
      }));

      console.log("Fetched and formatted categories:", formattedCategories);

      // Set the formatted categories to state
      setCategories(formattedCategories);

      fetchLists(arr[0]._id);
    })
    .catch((error) => {
      console.log(error);
    });

  return promise;
}

function fetchLists(categoryId){
  console.log("fetching lists");
  const promise = fetch(`${API_PREFIX}/lists/${categoryId}`)
    .then((res) => res.json())
    .then((arr) => {
      // Map the categories to the required format
      const formattedLists = arr.map((entry) => ({
        listName: entry.name, // Assuming `name` is the property that holds the category name
      }));

      console.log("Fetched and formatted categories:", formattedLists);

      // Set the formatted lists to state
      setLists(formattedLists);
      fetchTasks(arr[0]._id);


    })
    .catch((error) => {
      console.log(error);
    });
}

function fetchTasks(listId){
  console.log("fetching tasks");
  const promise = fetch(`${API_PREFIX}/tasks/${listId}`)
    .then((res) => res.json())
    .then((arr) => {
      // Map the categories to the required format
      const formattedTasks = arr.map((entry) => ({
        taskName: entry.name, // Assuming `name` is the property that holds the category name
      }));

      console.log("Fetched and formatted categories:", formattedLists);

      // Set the formatted lists to state
      setTasks(formattedTasks);
     


    })
    .catch((error) => {
      console.log(error);
    });
}




      


  useEffect(() => {
    // Fetch users
    fetchUsers()
      .then((res) => (res.status === 200 ? res.json() : undefined))
      .then((json) => {
        if (json) {
          setUsers(json["users_list"]);
        } else {
          setUsers(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  
    // Fetch categories if userId is set
    console.log("userId changed:", userId);
    setCategories([])
    fetchCategories(userId)
    
    

  }, [userId]); // Add userId as a dependency
  

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
          fetch(`${API_PREFIX}/users/${creds.username}`)
            .then((res) => res.json())
            .then((json) => setUserId(json[0]._id))
            .catch((error) => {
              console.log(error);
            });
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
    //need to add pop up message for username already taken
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
          fetch(`${API_PREFIX}/users/${creds.username}`)
            .then((res) => res.json())
            .then((json) => setUserId(json[0]._id))
            .catch((error) => {
              console.log(error);
            });
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
      <div className="">
        {/* Navigation bar */}
        <nav className="flex items-center justify-start py-4 px-4  bg-gray-200 border-b border-gray-300">
          {/* Profile (non-link item) */}
          <div className="flex gap-2 items-center bg-white py-2 px-4 border border-blue-500 text-blue-500 font-semibold rounded-md mr-4">
            <div>
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="w-4 h-4 rounded-full border-2  border-gray-300 shadow-md"
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
            <Route path="/" element={<Home
            categoryData={categories}
            listData={lists}
            taskData={tasks}
            removeCharacter={removeOneCharacter}
            userId = {userId}
            />} />
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
