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

function findUserByUsername(username) {
  return User.find({ username: username });
}

function deleteUser(id) {
  return User.findByIdAndDelete(id);
}

function getCategoriesByUserId(id) {
  return User.findById(id)
    .populate("categories")
    .then((user) => {
      if (!user) {
        throw new Error("User not found");
      }
      return user.categories;
    });
}

function addCategoryToUser(userId, categoryId) {
  return User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new Error("User not found");
      }
      user.categories.push(categoryId);
      return user.save();
    })
    .catch((error) => {
      console.log("Error adding category to user:", error);
    });
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByUsername,
  deleteUser,
  addCategoryToUser,
  getCategoriesByUserId,
};
