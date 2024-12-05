import { useState } from "react";

const LogIn = (props) => {
  const [creds, setCreds] = useState({
    username: "",
    pwd: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setCreds((prevCreds) => ({ ...prevCreds, [name]: value }));
  }

  function submitForm(e) {
    e.preventDefault();

    fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(creds),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token && data.userId) {
          // Save token and userId in localStorage
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("userId", data.userId);

          console.log("Login Successful, userId:", data.userId);

          // Pass the userId back to the parent component
          props.handleSubmit(data.userId);
        } else {
          console.error("Login failed:", data);
        }
      })
      .catch((error) => console.error("Error logging in:", error));
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-sm p-8 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-2">Log In</h2>
        <p className="text-center text-sm mb-6">
          Don’t have an account?{" "}
          <a href="/signup" className="underline text-blue-500">
            Sign up
          </a>
        </p>
        <form onSubmit={submitForm}>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              value={creds.username}
              onChange={handleChange}
              className="w-full p-3 bg-gray-200 text-gray-800 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Username"
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="pwd"
              value={creds.pwd}
              onChange={handleChange}
              className="w-full p-3 bg-gray-200 text-gray-800 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-sm text-blue-500 cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
