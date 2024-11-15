import mongoose from "mongoose";

const TaskListSchema = new mongoose.Schema(
    {
      tasks: {
        type: Array,
        required: true,
        trim: true,
      },
      category: {
        type: String,
        required: true,
        trim: true,
      },
    },
);

const TaskList = mongoose.model("TaskList", TaskListSchema);

export default TaskList;