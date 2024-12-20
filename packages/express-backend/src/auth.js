import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "../../../.env" });

const creds = [];

function generateAccessToken(username) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username: username },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      },
    );
  });
}

export function registerUser(req, res) {
  const { username, pwd } = req.body; // from form
  console.log("in register user")

  if (!username || !pwd) {
    res.status(400).send("Bad request: Invalid input data.");
  } else if (creds.find((c) => c.username === username)) {
    res.status(409).send("Username already taken");
  } else {
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(pwd, salt))
      .then((hashedPassword) => {
        generateAccessToken(username).then((token) => {
          console.log("Token:", token);
          creds.push({ username, hashedPassword });
          console.log(creds[creds.length - 1]);
          fetch("https://domoreapp-e5ecc0h3d6dzh3hz.westus-01.azurewebsites.net/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              username: creds[creds.length - 1]["username"],
              password: creds[creds.length - 1]["hashedPassword"],
            }),
          }).then(res.status(201).send({ token: token }));
        });
      });
  }

  console.log("exiting register user")
}

export function authenticateUser(req, res, next) {
  const authHeader = req.headers["Authorization"];
  //Getting the 2nd part of the auth header (the token)
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("No token received");
    res.status(401).end();
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
      if (decoded) {
        next();
      } else {
        console.log("JWT error:", error);
        res.status(401).end();
      }
    });
  }
}

export function loginUser(req, res) {
  const { username, pwd } = req.body; // from form
  const retrievedUser = creds.find((c) => c.username === username);

  if (!retrievedUser) {
    // invalid username
    res.status(401).send("Unauthorized");
  } else {
    bcrypt
      .compare(pwd, retrievedUser.hashedPassword)
      .then((matched) => {
        if (matched) {
          generateAccessToken(username).then((token) => {
            res.status(200).send({ token: token });
          });
        } else {
          // invalid password
          res.status(401).send("Unauthorized");
        }
      })
      .catch(() => {
        res.status(401).send("Unauthorized");
      });
  }
}
