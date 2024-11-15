import TaskList from "../models/taskList.js";

function getTaskLists() {
  return TaskList.find();
}

function findTaskListById(id) {
  return TaskList.findById(id);
}

function addTaskList(taskList) {
  const taskListToAdd = new TaskList(taskList);
  const promise = taskListToAdd.save();
  return promise;
}

function findTaskListByCategory(category) {
  return Task.find({ category: category });
}


export default {
    addTaskList,
    getTaskLists,
    findTaskListById,
    findTaskListByCategory,
};