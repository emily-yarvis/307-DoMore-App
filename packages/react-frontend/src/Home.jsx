// import React, { useState } from "react";
import { useState } from "react";
import Table from "./Table";
import ListView from "./ListView";
// import SelectedTask from "./SelectedTask"; 

function Home() {
  const [characters, setCharacters] = useState([]); 
  // const [selectedTask, setSelectedTask] = useState(null); 

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }

  // function updateList(person) {
  //   setCharacters([...characters, person]);
  // }

  return (
    <div className="flex space-x-4 p-4">
      <div className="w-1/3">
        <ListView listData={characters} removeCharacter={removeOneCharacter} />
      </div>
      <div className="w-px bg-gray-300" />
      <div className="w-2/3">
        <Table
          characterData={characters}
          removeCharacter={removeOneCharacter}
        />
      </div>
    </div>
  );
}

export default Home;
