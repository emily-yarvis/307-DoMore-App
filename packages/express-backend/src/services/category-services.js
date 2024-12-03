import Category from "../models/category.js";

function getCategories() {
  return Category.find();
}

function findCategoryById(id) {
  return Category.findById(id);
}

function addCategory(category) {
  const categoryToAdd = new Category(category);
  const promise = categoryToAdd.save();
  return promise;
}

function findCategoryByName(name) {
  return Category.find({ name: name });
}

function deleteCategory(id) {
  return Category.findByIdAndDelete(id);
}

export default {
  addCategory,
  getCategories,
  findCategoryById,
  findCategoryByName,
  deleteCategory,
};
