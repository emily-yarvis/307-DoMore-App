import List from "../models/list.js";

function getLists() {
  return List.find();
}

function findListById(id) {
  return List.findById(id);
}

function addList(list) {
  const listToAdd = new List(list);
  const promise = listToAdd.save();
  return promise;
}

function findListByName(name) {
  return List.find({ name: name });
}

function deleteList(id) {
  return List.findByIdAndDelete(id);
}

function getTasksByListId(listId) {
  return List.findById(listId)
    .populate("tasks") // Populate the tasks field in the List
    .then((list) => {
      if (!list) {
        throw new Error("List not found");
      }
      return list.tasks; // Return the populated tasks
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

function addTaskToList(listName, taskId) {
  return List.find({name:listName})
    .then((list) => {
      if (!list) {
        throw new Error("List not found");
      }
      list.tasks.push(taskId);
      return list.save();
    })
    .catch((error) => {
      console.log("Error adding task to list:", error);
    });
}

export default {
  addList,
  getLists,
  findListById,
  findListByName,
  deleteList,
  getTasksByListId,
  addTaskToList,
};
