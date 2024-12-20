import React, { useState } from "react";
import PropTypes from "prop-types";

const NewTask = ({ handleSubmit }) => {
  const [task, setTask] = useState({
    taskName: "",
    dueDate: "",
    description: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  }

  function submitForm() {
    if (handleSubmit) {
      handleSubmit(task);
    }
    setTask({ taskName: "", dueDate: "", description: "" });
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm p-8 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-2">Create a Task!</h2>

        <form>
          <div className="mb-4">
            <label
              htmlFor="taskName"
              className="text-lg font-medium text-left mb-2 block"
            >
              Task Name
            </label>
            <input
              id="taskName"
              type="text"
              name="taskName"
              value={task.taskName}
              onChange={handleChange}
              className="w-full p-3 bg-gray-200 text-gray-800 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="dueDate"
              className="text-lg font-medium text-left mb-2 block"
            >
              Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              className="w-full p-3 bg-gray-200 text-gray-800 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="text-lg font-medium text-left mb-2 block"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={task.description}
              onChange={handleChange}
              className="w-full h-36 p-3 bg-gray-200 text-gray-800 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task description"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={submitForm}
              className="py-2 px-4 bg-blue-500 text-white font-bold rounded-full"
            >
              &#10003;
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

NewTask.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default NewTask;
