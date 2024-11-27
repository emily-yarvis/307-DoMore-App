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
  return User.find({ username: username, password: password });
}

function deleteUser(id) {
  return User.findByIdAndDelete(id);
}

function getTasksByUserId(id) {
  return User.findById(id)
    .populate("tasks")
    .then(user => {
      if (!user) {
        throw new Error("User not found");
      }
      return user.tasks;
    });
}

function assignTaskToUser(userId, taskId) {
  return User.findByIdAndUpdate(
    userId,
    {
        $push: { tasks: taskId }  // Add the task reference (taskId) to the tasks array
    },
    { new: true } // Return the updated user document
  );
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByUsernameAndPassword,
  deleteUser,
  getTasksByUserId,
  assignTaskToUser
};
