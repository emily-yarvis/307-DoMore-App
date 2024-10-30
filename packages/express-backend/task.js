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
    }
  },
  { collection: "task_list" }
);

const User = mongoose.model("Task", TaskSchema);

export default User;