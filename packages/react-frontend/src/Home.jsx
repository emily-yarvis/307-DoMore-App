import React, { useState } from "react";
import TaskView from "./TaskView";
import ListView from "./ListView";
import CategoryView from "./CategoryView";

function Home(props) {
  const [currentList, setCurrentList] = useState(null);

  const handleSelectList = (listName) => {
    setCurrentList(listName);
  };

  console.log("In home ID:", props.userId);

  return (
    <div className="flex space-x-4 p-4">
      <div className="w-1/3">
        <div>
          <CategoryView
            addNewCategory={props.addNewCategory}
            addNewList={props.addNewList}
            userData={props.userData}
            onSelectList={handleSelectList} // Pass handler for list selection
          />
        </div>
      </div>
      <div className="w-px bg-gray-300" />
      <div className="w-2/3">
        <TaskView
          taskData={props.userData[currentList] || []} // Show tasks for the selected list
          addNewTask={props.addNewTask}
          currentList={currentList}
        />
      </div>
    </div>
  );
}

export default Home;
