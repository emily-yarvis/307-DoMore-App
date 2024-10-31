import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    dueDate: {
      type: String,
      required: true,
      trim: true,
    },
    priority: {
      type: Number,
      required: true,
      trim: true
    },
    tags: {
      type: Array,
      required: false,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    }
  },
);



const Task = mongoose.model("Task", TaskSchema);

export default Task;