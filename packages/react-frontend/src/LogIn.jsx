import { useState } from "react";

const LogIn = (props) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [creds, setCreds] = useState({
    username: "",
    pwd: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case "username":
        setCreds({ ...creds, username: value });
        break;
      case "password":
        setCreds({ ...creds, pwd: value });
        break;
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Log-In data:", creds);
  };

  function submitForm() {
    props.handleSubmit(creds);
    setCreds({ username: "", pwd: "" });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-sm p-8 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-2">Log In</h2>
        <p className="text-center text-sm mb-6">
          don’t have an account?{" "}
          <a href="/signup" className="underline text-blue-500">
            sign up
          </a>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="tetxt"
              name="username"
              id="username"
              value={creds.username}
              onChange={handleChange}
              className="w-full p-3 bg-gray-200 text-gray-800 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={creds.pwd}
              onChange={handleChange}
              className="w-full p-3 bg-gray-200 text-gray-800 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-sm text-blue-500 cursor-pointer"
            >
              {showPassword ? "hide" : "show"}
            </span>
          </div>
          <div className="text-right mb-4">
            <a href="#" className="text-xs text-blue-500 underline">
              forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md mb-4"
            onClick={submitForm}

          >
            log in
          </button>
          <div className="flex items-center mb-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-xs">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <button className="w-full py-2 border border-blue-500 text-blue-500 font-semibold rounded-md">
            login with google/canvas
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
