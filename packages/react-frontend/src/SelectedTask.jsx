// import React from "react";
import PropTypes from "prop-types";

const SelectedTask = ({ taskName, dueDate, description }) => {
  return (
    <div className="p-4 bg-gray-200 shadow-lg rounded-md max-w-sm">
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

SelectedTask.propTypes = {
  taskName: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default SelectedTask;
