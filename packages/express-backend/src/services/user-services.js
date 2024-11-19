import User from "../models/user.js";

function getUsers() {
  return User.find();
}

function findUserById(id) {
  return User.findById(id);
}

function addUser(user) {
  const userToAdd = new User(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByUsernameAndPassword(username, password) {
  return User.find({username: username, password: password });
}

function deleteUser(id) {
  return User.findByIdAndDelete(id);
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByUsernameAndPassword,
  deleteUser
};