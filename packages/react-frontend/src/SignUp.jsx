import { useState } from 'react';

const SignUp = (props) => {
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
        console.log(creds)
        break;
      case "password":
        setCreds({ ...creds, pwd: value });
        console.log(creds)
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign-Up data:", creds);
  };

  function submitForm() {
    props.handleSubmit(creds);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-sm p-8 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-2">Sign Up</h2>
        <p className="text-center text-sm mb-6">
          have an account already? <a href="/login" className="underline text-blue-500">log in</a>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="username"
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
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md mb-4"
            onClick={submitForm}
          >
            sign up
          </button>
          
          
        </form>
      </div>
    </div>
  );
};

export default SignUp;
