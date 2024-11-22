// import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import NewTask from "./NewTask";
import SelectedTask from "./SelectedTask";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Task Name</th>
        <th>Due Date</th>
        <th>Delete</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  if (props.characterData === null) {
    return <caption>Data Unavailable</caption>;
  } else {
    console.log("WOOF"+props.characterData)
    const rows = props.listData.map((row, index) => (
      <tr key={index} onClick={() => props.handleSelectTask(row)}>
        <td>{row.taskName}</td>
        <td>{row.dueDate}</td>
        <td>
          <button
            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md mb-4"
            onClick={(e) => {
              e.stopPropagation();
              props.removeCharacter(index);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return <tbody>{rows}</tbody>;
  }
}

TableBody.propTypes = {
  listData: PropTypes.arrayOf(
    PropTypes.shape({
      taskName: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
    })
  ).isRequired,
  removeCharacter: PropTypes.func.isRequired,
  handleSelectTask: PropTypes.func.isRequired,
};

function Table(props) {
  const [showModal, setShowModal] = useState(false);
  const [taskData, setTaskData] = useState(props.listData || []);
  const [selectedTask, setSelectedTask] = useState(null);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  function addNewTask(task) {
    setTaskData([...taskData, task]);
    closeModal();
  }

  const handleSelectTask = (task) => {
    setSelectedTask(task);
  };

  return (
    <div className="flex space-x-4">
      <div className="w-2/3">
        <table>
          <TableHeader />
          <TableBody
            listData={taskData}
            removeCharacter={props.removeCharacter}
            handleSelectTask={handleSelectTask}
          />
        </table>

        <button
          className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md mt-4"
          onClick={openModal}
        >
          Add a Task
        </button>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <NewTask handleSubmit={addNewTask} />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
            >
              &#10005;
            </button>
          </div>
        )}
      </div>

      {selectedTask && (
        <div className="w-1/2">
          <SelectedTask
            taskName={selectedTask.taskName}
            dueDate={selectedTask.dueDate}
            description={selectedTask.description}
          />
        </div>
      )}
    </div>
  );
}

Table.propTypes = {
  listData: PropTypes.arrayOf(
    PropTypes.shape({
      taskName: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
    })
  ).isRequired,
  removeCharacter: PropTypes.func.isRequired,
};

export default Table;
