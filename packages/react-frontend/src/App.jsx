// src/MyApp.jsx
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Home from "./Home";
import NewTask from "./NewTask";
import NewList from "./NewList";

function App() {
  const [characters, setCharacters] = useState([]);


  return (
    <Router>
      {" "}
      {/* implemented router*/}
      <div className="container">
        {/* nav links, placeholders for now */}
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

        {/* define routes */}
        <Routes>
          {/* home route with Table and Form */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/newTask" element={<NewTask />} />
          <Route path="/newList" element={<NewList />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
