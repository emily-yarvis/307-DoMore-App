// import React, { useState } from "react";
import { useState } from "react";
import TaskView from "./TaskView";
import ListView from "./ListView";
import CategoryView from "./CategoryView";
// import SelectedTask from "./SelectedTask";

function Home(props) {
  //const [lists, setLists] = useState([]);
  //const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [selectedTask, setSelectedTask] = useState(null);

  function removeOneCharacter(index) {
    console.log(lists[index]);
    const updated = lists.filter((list, i) => {
      return i !== index;
    });
    deleteUser(lists[index]).then(setLists(updated));
  }

  // function updateList(list) {
  //   setLists([...lists, list]);
  // }

  // function updateTasks(task) {
  //   setTasks([...tasks, task]);
  // }

  // function updateCategories(task) {
  //   setCategories([...categories, category]);
  // }

  return (
    <div className="flex space-x-4 p-4">
      <div className="w-1/3">
        <div >
          <CategoryView
            categoryData={props.categoryData}
            listData={props.listData}
            removeCharacter={removeOneCharacter}
          />
        </div>
      </div>
      <div className="w-px bg-gray-300" />
      <div className="w-2/3">
        <TaskView taskData={[
  { taskName: "Task 1", dueDate: "2024-12-10" },
  { taskName: "Task 2", dueDate: "2024-12-12" },
  { taskName: "Task 3", dueDate: "2024-12-15" }
]} removeCharacter={removeOneCharacter} />
      </div>
    </div>
  );
}

export default Home;
