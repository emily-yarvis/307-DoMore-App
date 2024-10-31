import Task from "../models/task.js";

function getTasks() {
  return Task.find();
}

function findTaskById(id) {
  return Task.findById(id);
}

function addTask(task) {
  const taskToAdd = new Task(task);
  const promise = taskToAdd.save();
  return promise;
}

function findTaskByName(name) {
  return Task.find({ name: name });
}

function findTaskByJob(job) {
  return Task.find({ job: job });
}

export default {
  addTask,
  getTasks,
  findTaskById,
  findTaskByName,
  findTaskByJob,
};