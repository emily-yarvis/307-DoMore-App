import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Home from "./Home";


function App() {
  const API_PREFIX =
    "https://domoreapp-e5ecc0h3d6dzh3hz.westus-01.azurewebsites.net";
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentList, setCurrentList] = useState("");
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [userData, setUserData] = useState({});
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [currentTask, setCurrentTask] = useState("");
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  

  function fetchCategories(currentUserId) {
  const promise = fetch(`${API_PREFIX}/categories/${currentUserId}`, {headers: addAuthHeader()})
    .then((res) => res.json())
    .then((arr) => {
      // Map the categories to the required format
      const formattedCategories = arr.map((entry) => ({
        categoryName: entry.name, // Assuming `name` is the property that holds the category name
      }))
      console.log("Fetched and formatted categories:", formattedCategories);

      // Set the formatted categories to state
      setCategories(formattedCategories);
      setCurrentCategory(arr[0]._id)
      fetchLists(arr[0]._id);
    })
    .catch((error) => {
      console.log(error);
    });

  return promise;
  }


function addNewCategory(category) {
  console.log("Adding category for user:", category);
  const categoryName = category.categoryName;
  setUserData((prevData) => {
    const updatedData = {
      ...prevData, 
      [categoryName]: {}, // Initialize category with an empty lists array
    };
    console.log("Updated userData:", updatedData);
    return updatedData;
  });
  // Create a new category with an empty structure for lists
  

  console.log(userData);


  fetch(`${API_PREFIX}/categories/${username}`, {
    method: "POST",
    headers: addAuthHeader({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      name: category.categoryName,
    }),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Category added successfully");
        // Wait for the response to confirm success, then fetch updated categories
      } else {
        throw new Error(`Failed to add category: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error("Error adding category:", error);
    });
}

function addNewList(list, categoryName) {
  console.log("Adding list for category:", categoryName);

  const listName = list.listName;
  setUserData((prevData) => {
    // Directly add the new list to the lists array of the specified category
    const updatedData = {
      ...prevData,
      [categoryName]: {
        ...prevData[categoryName], // Keep the existing data for the category (e.g., lists)
        [listName]: []
      }
    };

    return updatedData;
  });


  fetch(`${API_PREFIX}/lists/${categoryName}`, {
    method: "POST",
    headers: addAuthHeader({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      name: list.listName,
    }),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Category added successfully");
        // Wait for the response to confirm success, then fetch updated categories
      } else {
        throw new Error(`Failed to add category: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error("Error adding category:", error);
    });
}

function addNewTask(task, listName, categoryName) {
  console.log("Adding task for list:", listName);

  setUserData((prevData) => {
    const updatedData = {
      ...prevData,
      [categoryName]: {
        ...prevData[categoryName], // Keep existing data for the category
        [listName]: [
          ...(prevData[categoryName][listName] || []), // Use existing tasks or initialize as an empty array
          task // Add the new task
        ]
      }
    };
  
    return updatedData;
  });

  fetch(`${API_PREFIX}/tasks/${listName}`, {
    method: "POST",
    headers: addAuthHeader({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      name: task.taskName,
      dueDate: task.dueDate,
      priority: 1,
      description: task.description
    }),
  })
    .then((response) => {
      if (response.ok) {
        console.log("task added successfully");
        // Wait for the response to confirm success, then fetch updated categories
      } else {
        throw new Error(`Failed to add task: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error("Error adding task:", error);
    });
}





function fetchData(username) {
  fetch(`${API_PREFIX}/users/${username}`, {header: addAuthHeader()})
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      return response.json(); // Parse JSON response
    })
    .then((result) => {
      console.log(result);
      setUserData(result); // Update userData state
    })
    .catch((err) => {
      setUserData({})
      console.error("Error fetching user data:", err);
    });
}


  useEffect(() => {

    fetchData(username) 

  }, [username]); // Add userId as a dependency
  

  function loginUser(creds) {
    const promise = fetch(`${API_PREFIX}/login`, {
      method: "POST",
      headers: addAuthHeader({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(creds),
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((payload) => setToken(payload.token));
          setMessage(`Login successful; auth token saved`);
          console.log("fetching user id in login")
          setUsername(creds.username);
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
      headers: addAuthHeader({
        "Content-Type": "application/json", 
      }),
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
            to="/Home"
            className="py-2 px-4 border bg-white border-blue-500 text-blue-500 font-semibold rounded-md mr-4"
          >
            Home
          </Link>
          <Link
            to="/"
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
            <Route path="/Home" element={<Home
            // categoryData={categories}
            // listData={lists}
            taskData={tasks}
            // removeCharacter={removeOneCharacter}
            // userId = {userId}
            addNewCategory = {addNewCategory}
            addNewList = {addNewList}
            // currentCategpry = {currentCategory}
            addNewTask = {addNewTask}
            currentList = {currentList}
            userData = {userData}
            />} />
            <Route
              path="/"
              element={<SignUp handleSubmit={signupUser} />}
            />
            <Route path="/login" element={<LogIn handleSubmit={loginUser} />} />
            
           
          </Routes>
        </div>
      </div>
    </Router>
  );
}
            

export default App;
