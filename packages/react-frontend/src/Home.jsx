import React, { useState } from "react";
import TaskView from "./TaskView";
import CategoryView from "./CategoryView";

function Home(props) {
  const [currentList, setCurrentList] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");

  const handleSelectList = (listName, categoryName) => {
    setCurrentList(listName);
    setCurrentCategory(categoryName)
  };

  console.log("In home ID:",props.userId)
  function removeOneCharacter(index) {
    console.log(lists[index]);
    const updated = lists.filter((list, i) => {
      return i !== index;
    });
    deleteUser(lists[index]).then(setLists(updated));
  }

  function addNewTask(task) {
    props.addNewTask(task, currentList, currentCategory)
  }

  return (
    <div className="flex space-x-4 p-4">
      <div className="w-1/3">
        <div >
          <CategoryView
            addNewCategory = {props.addNewCategory}
            addNewList = {props.addNewList}
            userData = {props.userData}
            onSelectList={handleSelectList}
          />
        </div>
      </div>
      <div className="w-px bg-gray-300" />
      <div className="w-2/3">
        <TaskView 
         taskData = {props.userData[currentCategory]?.[currentList] || []}
          removeCharacter={removeOneCharacter} 
          addNewTask = {addNewTask} 
          currentList = {currentList} />
      </div>
    </div>
  );
}

export default Home;
