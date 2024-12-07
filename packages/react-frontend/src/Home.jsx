import React, { useState } from "react";
import TaskView from "./TaskView";
import ListView from "./ListView";
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
            // categoryData={props.categoryData}
            // listData={props.listData}
            // removeCharacter={removeOneCharacter}
            // userId={props.userId}
            addNewCategory = {props.addNewCategory}
            addNewList = {props.addNewList}
            // currentCategory = {props.currentCategory}
            userData = {props.userData}
            onSelectList={handleSelectList}
          />
        </div>
      </div>
      <div className="w-px bg-gray-300" />
      <div className="w-2/3">
        <TaskView 
         taskData={props.userData[currentList] || []}
          removeCharacter={removeOneCharacter} 
          addNewTask = {props.addNewTask} 
          currentList = {props.currentList} />
      </div>
    </div>
  );
}

export default Home;
