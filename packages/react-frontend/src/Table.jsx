import React, { useState } from "react";
import NewTask from "./NewTask"; // Ensure NewTask component is correctly imported
import SelectedTask from "./SelectedTask"; // Import the SelectedTask component

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
  const rows = props.listData.map((row, index) => (
    <tr key={index} onClick={() => props.handleSelectTask(row)}>
      <td>{row.taskName}</td>
      <td>{row.dueDate}</td>
      <td>
        <button
          className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md mb-4"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering task selection when clicking delete
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

function Table(props) {
  const [showModal, setShowModal] = useState(false);
  const [taskData, setTaskData] = useState(props.listData || []);
  const [selectedTask, setSelectedTask] = useState(null); // State to track the selected task

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // Add new task to the list
  function addNewTask(task) {
    setTaskData([...taskData, task]);
    closeModal();
  }

  // Handle task selection to display in the SelectedTask component
  const handleSelectTask = (task) => {
    setSelectedTask(task);
  };

  return (
    <div className="flex space-x-4"> {/* Flexbox for horizontal layout */}
      {/* Table body component */}
      <div className="w-2/3">
        <table>
          <TableHeader />
          <TableBody
            listData={taskData}
            removeCharacter={props.removeCharacter}
            handleSelectTask={handleSelectTask} // Pass the select function to TableBody
          />
        </table>

        <button
          className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md mt-4"
          onClick={openModal}
        >
          Add a Task
        </button>

        {/* Conditionally render the modal for adding new task */}
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

      {/* SelectedTask component on the right, only renders when a task is selected */}
      {selectedTask && (
        <div className="w-1/2"> {/* 1/3 width for the selected task */}
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

export default Table;

