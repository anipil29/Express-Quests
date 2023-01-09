const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.APP_PORT ?? 5001;
const { hashPassword, verifyPassword, verifyToken } = require("./auth");

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const { hashPassword } = require("./auth.js");
const userHandlers = require("./userHandlers");

app.post(
  "/api/login",
  userHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
); 
app.post("/api/users", validateUser, hashPassword, userHandlers.postUser);
app.get("/api/users", userHandlers.getUser);
app.get("/api/users/:id", userHandlers.getUserById);
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.use(verifyToken);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);
app.delete("/api/users/:id", userHandlers.deleteUser);
app.put("/api/users/:id", validateUser, userHandlers.updateUser);
app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

