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

export default {
  addList,
  getLists,
  findListById,
  findListByName,
  deleteList,
};
