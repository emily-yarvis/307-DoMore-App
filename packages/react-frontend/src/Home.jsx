import { useState } from "react";
import TaskView from "./TaskView";
import ListView from "./ListView";
import CategoryView from "./CategoryView";

function Home({ categoryData, listData, taskData, fetchLists, fetchTasks }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedList, setSelectedList] = useState(null);

  function handleCategoryClick(categoryId) {
    setSelectedCategory(categoryId);
    fetchLists(categoryId);
  }

  function handleListClick(listId) {
    setSelectedList(listId);
    fetchTasks(listId);
  }

  return (
    <div className="flex p-4 space-x-4">
      <div className="w-1/3">
        <h2>Categories</h2>
        <ul>
          {categoryData.map((category) => (
            <li
              key={category._id}
              onClick={() => handleCategoryClick(category._id)}
              className="cursor-pointer"
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-1/3">
        <h2>Lists</h2>
        <ul>
          {listData.map((list) => (
            <li
              key={list._id}
              onClick={() => handleListClick(list._id)}
              className="cursor-pointer"
            >
              {list.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-1/3">
        <h2>Tasks</h2>
        <ul>
          {taskData.map((task) => (
            <li key={task._id}>{task.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
