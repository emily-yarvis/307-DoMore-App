// src/MyApp.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Table from "./Table";
import Form from "./Form";
import SignUp from "./SignUp";
import LogIn from "./LogIn";


function App() {
    const [characters, setCharacters] = useState([]);

    function removeOneCharacter(index) {
        const updated = characters.filter((character, i) => {
          return i !== index;
        });
        setCharacters(updated);
      }

      function updateList(person) {
        setCharacters([...characters, person]);
      }

      return (
        <Router> {/* implemented router*/}
          <div className="container">
            
            {/* nav links, placeholders for now */}
            <nav className="my-4"> 
              <Link to="/" className="mr-4 text-blue-600">Home</Link>
              <Link to="/signup" className="mr-4 text-blue-600">Sign Up</Link>
              <Link to="/login" className="text-blue-600">Log In</Link>
            </nav>
            
            {/* define routes */}
            <Routes>
              {/* home route with Table and Form */}
              <Route 
                path="/" 
                element={
                  <>
                    <Table characterData={characters} removeCharacter={removeOneCharacter} />
                    <Form handleSubmit={updateList} />
                  </>
                }
              />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
            </Routes>
          </div>
        </Router>
      );
  }


export default App;