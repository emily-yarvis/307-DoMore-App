// src/SelectedTask.jsx
import React from "react";

const SelectedTask = ({ taskName, dueDate, description }) => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-md max-w-sm">
      <h2 className="text-2xl font-semibold mb-2">{taskName}</h2>
      <p className="text-gray-700 mb-2">
        <strong>Due Date:</strong> {dueDate}
      </p>
      <p className="text-gray-700">
        <strong>Description:</strong> {description}
      </p>
    </div>
  );
};

export default SelectedTask;