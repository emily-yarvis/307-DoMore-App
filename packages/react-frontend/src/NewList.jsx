import React, { useState } from "react";

const NewList = (props) => {
  const [list, setList] = useState({
    listName: "",
  });
  

  function handleChange(event) {
    const { name, value } = event.target;
      setList({ listName: value });
  }
  function submitForm() {
    props.handleSubmit(list);
    setList({ listName: "" });
  }

  return (
    <div className="flex items-center justify-center min-h-screen  p-4">
      <div className="w-full max-w-sm p-8 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-2">
          Create a List!
        </h2>

        <form >
          <div className="mb-4">
            <h3 className="text-lg font-medium text-left mb-2">List Name</h3>
            <input
              type="taskName"
              name="taskName"
              value={list.listName}
              onChange={handleChange}
              className="w-full p-3 bg-gray-200 text-gray-800 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=""
            />
          </div>
        
          <div className="flex items-center justify-center mb-4 relative">
            <button
              type="button"
              value = "Submit"
              onClick={submitForm}
              className="py-2 bg-blue-500 text-white font-bold rounded-full mb-4"
            >
              &#10003;
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewList;
