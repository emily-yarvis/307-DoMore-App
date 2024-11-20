import React, { useState } from "react";
import Table from "./Table";
import ListView from "./ListView";
import SelectedTask from "./SelectedTask";

function Home() {
  const [characters, setCharacters] = useState([]); // Manage task list state
  const [selectedTask, setSelectedTask] = useState(null); // Manage selected task

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }

  function updateList(person) {
    setCharacters([...characters, person]);
  }

  // Handle task selection
  const handleSelectTask = (task) => {
    setSelectedTask(task);
  };

  return (
    <div className="flex space-x-4 p-4">
      {/* Table on the left */}
      <div className="w-1/3">
        <ListView listData={characters} removeCharacter={removeOneCharacter} />
      </div>
      <div className="w-px bg-gray-300" />

      {/* Table component in the center */}
      <div className="w-2/3">
        <Table
          characterData={characters} // Pass characters to Table
          removeCharacter={removeOneCharacter}
          handleSelectTask={handleSelectTask} // Pass task selection handler
        />
      </div>
      
    </div>
  );
}

export default Home;
