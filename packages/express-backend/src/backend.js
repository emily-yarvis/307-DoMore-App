import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import taskServices from "./services/task-services.js";
import userServices from "./services/user-services.js";
import listServices from "./services/list-services.js";
import categoryServices from "./services/category-services.js";
import { registerUser, loginUser, authenticateUser } from "./auth.js";

//Database and API setup
const app = express();
const port = 8000;

// app.use(cors({
//   origin: 'https://thankful-stone-03264d61e.5.azurestaticapps.net',
//   methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));
app.use(cors())
// app.options('*', cors()); // Handle preflight requests
app.use(express.json());

mongoose.set("debug", true);
mongoose
  .connect(
    "mongodb+srv://rishabhjhamnani:LFEf6PWNMKxLcgdO@domore.dpfjd.mongodb.net/?retryWrites=true&w=majority&appName=DoMore",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .catch((error) => console.log(error));

//Task API routes
app.get("/tasks", (req, res) => {
  taskServices
    .getTasks()
    .then((taskList) => res.status(200).send(taskList))
    .catch(() => res.status(404).send("Resource not found."));
});

app.get("/tasks/:listId", authenticateUser, (req, res) => {
  const listId = req.params["listId"];

  listServices
    .getTasksByListId(listId)
    .then((taskList) => res.status(200).send(taskList))
    .catch(() => res.status(404).send("Resource not found."));
});

app.post("/tasks/:listName", authenticateUser, (req, res) => {
  const listName = req.params["listName"];
  const taskToAdd = req.body;

  taskServices
    .addTask(taskToAdd)
    .then((task) => {
      return listServices.addTaskToList(listName, task._id);
    })
    .then(() => {
      res.status(201).send({ message: "Task successfully added to list!" });
    })
    .catch((error) => {
      console.error("Error adding task to list:", error.message);
      res.status(500).send({ error: "Failed to add task to list" });
    });
});

app.delete("/tasks/:taskId", (req, res) => {
  const taskToDelete = req.params["taskId"];
  taskServices
    .deleteTask(taskToDelete)
    .then((result) => res.status(204).send(result))
    .catch(() => res.status(404).send("Resource not found."));
});

//List API routes
app.get("/lists", (req, res) => {
  listServices
    .getLists()
    .then((listList) => res.status(200).send(listList))
    .catch(() => res.status(404).send("Resource not found."));
});

app.get("/lists/:categoryId", authenticateUser, (req, res) => {
  const categoryId = req.params["categoryId"];

  categoryServices
    .getListsByCategoryId(categoryId)
    .then((listList) => res.status(200).send(listList))
    .catch(() => res.status(404).send("Resource not found."));
});

app.post("/lists/:categoryName", authenticateUser, (req, res) => {
  const categoryName = req.params["categoryName"];
  const listToAdd = req.body;

  listServices
    .addList(listToAdd)
    .then((list) => {
      return categoryServices.addListToCategory(categoryName, list._id);
    })
    .then(() => {
      res.status(201).send({ message: "List successfully added to category!" });
    })
    .catch((error) => {
      console.error("Error adding list to category:", error.message);
      res.status(500).send({ error: "Failed to add list to category" });
    });
});

app.delete("/lists/:listId", (req, res) => {
  const listToDelete = req.params["listId"];
  listServices
    .deleteUser(listToDelete)
    .then((result) => res.status(204).send(result))
    .catch(() => res.status(404).send("Resource not found."));
});

//Category API routes
app.get("/categories", (req, res) => {
  categoryServices
    .getCategories()
    .then((categoryList) => res.status(200).send(categoryList))
    .catch(() => res.status(404).send("Resource not found."));
});

app.get("/categories/:userId", authenticateUser, (req, res) => {
  const userId = req.params["userId"];

  userServices
    .getCategoriesByUserId(userId)
    .then((categoryList) => res.status(200).send(categoryList))
    .catch(() => res.status(404).send("Resource not found."));
});

app.post("/categories/:userName", authenticateUser, (req, res) => {
  const userName = req.params["userName"];
  const categoryToAdd = req.body;

  categoryServices
    .addCategory(categoryToAdd)
    .then((category) => {
      return userServices.addCategoryToUser(userName, category._id);
    })
    .then(() => {
      res.status(201).send({ message: "Category successfully added to user!" });
    })
    .catch((error) => {
      console.error("Error adding category to user:", error.message);
      res.status(500).send({ error: "Failed to add category to user" });
    });
});

app.delete("/categories/:categoryId", (req, res) => {
  const categoryToDelete = req.params["categoryId"];
  categoryServices
    .deleteUser(categoryToDelete)
    .then((result) => res.status(204).send(result))
    .catch(() => res.status(404).send("Resource not found."));
});

//User API routes

app.get("/users/:username", authenticateUser, (req, res) => {
  const username = req.params.username;

  userServices
    .findUserByUsername(username)
    .then((user) => userServices.getCategoriesByUserId(user._id))
    .then((categories) => {
      const categoryPromises = categories.map((category) => {
        const categoryName = category.name;

        return categoryServices
          .getListsByCategoryId(category._id)
          .then((lists) => {
            const listsData = {};
            const listPromises = lists.map((list) => {
              const listName = list.name;

              return listServices
                .getTasksByListId(list._id)
                .then((tasks) => {
                  listsData[listName] = tasks;
                });
            });

            return Promise.all(listPromises).then(() => ({
              [categoryName]: listsData,
            }));
          });
      });

      return Promise.all(categoryPromises).then((result) => {
        const transformedData = result.reduce((acc, curr) => {
          return { ...acc, ...curr };
        }, {});
        return transformedData;
      });
    })
    .then((transformedData) => {
      res.status(200).send(transformedData);
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      res.status(500).send({ error: "Internal Server Error" });
    });
});



app.post("/users", authenticateUser, (req, res) => {
  const userToAdd = req.body;
  userServices
    .addUser(userToAdd)
    .then(res.status(201).send(userToAdd))
    .catch((error) => {
      console.log(error);
    });
});

app.post("/signup", registerUser);
app.post("/login", loginUser);

app.delete("/users/:userId", (req, res) => {
  const userToDelete = req.params["userId"];
  userServices
    .deleteUser(userToDelete)
    .then((result) => res.status(204).send(result))
    .catch(() => res.status(404).send("Resource not found."));
});

app.listen(process.env.PORT || port, () => {
  console.log("REST API is listening.");
});
