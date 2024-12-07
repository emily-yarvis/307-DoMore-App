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
    .populate("lists")
    .then((category) => {
      if (!category) {
        throw new Error("Category not found");
      }
      return category.lists;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

function addListToCategory(categoryName, listId) {
  return Category.find({name: categoryName})
    .then((category) => {
      if (!category) {
        throw new Error("Category not found");
      }
      category.lists.push(listId);
      return category.save();
    })
    .catch((error) => {
      console.log("Error adding task to category:", error);
    });
}

export default {
  addCategory,
  getCategories,
  findCategoryById,
  findCategoryByName,
  deleteCategory,
  getListsByCategoryId,
  addListToCategory,
};
