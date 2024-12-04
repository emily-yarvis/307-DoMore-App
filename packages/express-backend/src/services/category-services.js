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

function getListsByCategoryId(categoryId) {
  return Category.findById(categoryId)
    .populate("lists") // Populate the lists field in the Category
    .then((category) => {
      if (!category) {
        throw new Error("Category not found");
      }
      return category.lists; // Return the populated lists
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export default {
  addCategory,
  getCategories,
  findCategoryById,
  findCategoryByName,
  deleteCategory,
  getListsByCategoryId,
};
