import React, { useState } from "react";

const NewTask = (props) => {
  const [task, setTask] = useState({
    taskName: "",
    dueDate: "",
    description: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "dueDate")
      setTask({ taskName: task["taskName"], dueDate: value, description: task["description"] });
    else if(name ==="taskName") 
        setTask({ taskName: value, dueDate: task["dueDate"], description: task["description"] });
    else if(name ==="description") 
        setTask({ taskName: task["taskName"], dueDate: task["dueDate"], description: value });
  }
  function submitForm() {
    props.handleSubmit(task);
    setTask({ taskName: "", dueDate: "",description: "" });
  }

  return (
    <div className="flex items-center justify-center min-h-screen  p-4">
      <div className="w-full max-w-sm p-8 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-2">
          Create a Task!
        </h2>

        <form >
          <div className="mb-4">
            <h3 className="text-lg font-medium text-left mb-2">Task Name</h3>
            <input
              type="taskName"
              name="taskName"
              value={task.taskName}
              onChange={handleChange}
              className="w-full p-3 bg-gray-200 text-gray-800 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=""
            />
          </div>
          <div className="mb-4 relative">
            <h3 className="text-lg font-medium text-left mb-2">Due Date</h3>
            <input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              className="w-full p-3 bg-gray-200 text-gray-800 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=""
            />
          </div>
          <div className="mb-4 relative">
            <h3 className="text-lg font-medium text-left mb-2">Description</h3>
            <textarea
              type="description"
              name="description"
              value={task.description}
              onChange={handleChange}
              className="w-full h-36p-3 bg-gray-200 text-gray-800 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=""
            />
          </div>
          <div className="flex items-center justify-center mb-4 relative">
            <button
              type="button"
              value = "submit"
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

export default NewTask;
