import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
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
