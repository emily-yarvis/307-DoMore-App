import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import taskServices from "./services/task-services.js"
import userServices from "./services/user-services.js";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

mongoose.set("debug", true);
mongoose
  .connect("mongodb+srv://rishabhjhamnani:LFEf6PWNMKxLcgdO@domore.dpfjd.mongodb.net/?retryWrites=true&w=majority&appName=DoMore", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/tasks", (req, res) => {
  taskServices.getTasks()
    .then((taskList) => res.send(taskList))
    .catch(() => res.status(404).send("Resource not found."));
});

app.post("/tasks", (req, res) => {
  const taskToAdd = req.body;
    taskServices.addTask(taskToAdd)
      .then(res.status(201).send(taskToAdd))
      .catch((error) => { console.log(error); });
})

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});