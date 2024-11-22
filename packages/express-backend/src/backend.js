import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import taskServices from "./services/task-services.js"
import userServices from "./services/user-services.js";

//Database and API setup
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

//Home API routes
app.get("/tasks", (req, res) => {
  taskServices.getTasks()
    .then((taskList) => res.status(200).send(taskList))
    .catch(() => res.status(404).send("Resource not found."));
});

app.get("/tasks/:tag", (req, res) => {
  const tag = req.params["tag"];

  console.log("in here")
  taskServices.findTasksByTag(tag)
    .then((taskList) => res.status(200).send(taskList))
    .catch(() => res.status(404).send("Resource not found."));

});

app.post("/tasks", (req, res) => {
  const taskToAdd = req.body;
    taskServices.addTask(taskToAdd)
      .then(res.status(201).send(taskToAdd))
      .catch((error) => { console.log(error); });
})

app.delete("/tasks", (req, res) => {
  const taskToDelete = req.body._id;
  taskServices.deleteTask(taskToDelete)
    .then(res.status(204).send())
    .catch(() => res.status(404).send("Resource not found."));
});

//User API routes
app.get("/users", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username == undefined && password == undefined) {
    userServices.getUsers()
      .then((users) => res.status(200).send(users))
      .catch(() => res.status(404).send("Resource not found."));
  }

  else if (username != undefined && password != undefined) {
    userServices.findUserByUsernameAndPassword(username, password)
      .then((user) => res.status(200).send(user))
      .catch(() => res.status(404).send("Resource not found."));
  }

  else {
    res.status(404).send("Resource not found.");
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userServices.addUser(userToAdd)
    .then(res.status(201).send(userToAdd))
    .catch((error) => { console.log(error); });
})

app.delete("/users", (req, res) => {
  const userToDelete = req.body._id;
  userServices.deleteUser(userToDelete)
    .then((result) => res.status(204).send())
    .catch(() => res.status(404).send("Resource not found."));
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
