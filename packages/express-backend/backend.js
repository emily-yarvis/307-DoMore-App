import express from "express";
import cors from "cors";
import userServices from "./user-services.js"

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  userServices.getUsers()
    .then((userList) => res.send(userList))
    .catch(() => res.status(404).send("Resource not found."));
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
    userServices.addUser(userToAdd)
      .then(res.status(201).send(userToAdd))
      .catch((error) => { console.log(error); });
})

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});