import PropTypes from "prop-types";

const SelectedTask = ({ taskName, dueDate, description }) => {
  return (
    <div className="p-4 bg-gray-200 shadow-lg rounded-md ">
      <h2 className="text-2xl text-center bg-white rounded-md font-semibold mb-4 max-w-sm">
        {taskName}
      </h2>
      <p className="text-gray-700 bg-white rounded-md mb-4 w-fit p-2 ">
        <strong>Due Date:</strong> {dueDate}
      </p>
      <div className="min-w-40 min-h-40 max-w-80 max-h-80 overflow-auto rounded-md bg-white border border-gray-300 p-4">
        <p className="text-gray-700">
          {description}
        </p>
      </div>
    </div>
  );
};

SelectedTask.propTypes = {
  taskName: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default SelectedTask;
