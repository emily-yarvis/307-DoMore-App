import React, { useState } from "react";
import TaskView from "./TaskView";
import ListView from "./ListView";
import CategoryView from "./CategoryView";

function Home(props) {

  console.log("In home ID:",props.userId)
  function removeOneCharacter(index) {
    console.log(lists[index]);
    const updated = lists.filter((list, i) => {
      return i !== index;
    });
    deleteUser(lists[index]).then(setLists(updated));
  }

  return (
    <div className="flex space-x-4 p-4">
      <div className="w-1/3">
        <div >
          <CategoryView
            categoryData={props.categoryData}
            listData={props.listData}
            removeCharacter={removeOneCharacter}
            userId={props.userId}
          />
        </div>
      </div>
      <div className="w-px bg-gray-300" />
      <div className="w-2/3">
        <TaskView taskData={props.taskData} removeCharacter={removeOneCharacter} />
      </div>
    </div>
  );
}

export default Home;
