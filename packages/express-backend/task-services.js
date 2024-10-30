import mongoose from "mongoose";
import taskModel from "./task.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb+srv://rishabhjhamnani:LFEf6PWNMKxLcgdO@domore.dpfjd.mongodb.net/?retryWrites=true&w=majority&appName=DoMore", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function getTasks(name, job) {
  return taskModel.find();
}

function findTaskById(id) {
  return taskModel.findById(id);
}

function addTask(user) {
  const taskToAdd = new taskModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findTaskByName(name) {
  return taskModel.find({ name: name });
}

function findTaskByJob(job) {
  return taskModel.find({ job: job });
}

export default {
  addTask,
  getTasks,
  findTaskById,
  findTaskByName,
  findTaskByJob,
};