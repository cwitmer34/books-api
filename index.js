// MODULES AND GLOBALS
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

// EXPRESS SETTINGS
app.use(express.json());
app.use(cors());

// CONTROLLERS AND ROUTES
app.use("/books", require("./controllers/books"));

// Index
app.get("/", (req, res) => {
  res.send("This is CORS-enabled for all origins!");
});

// 404
app.get("*", (req, res) => {
  res.status(404).send("error404");
});

app.listen(
  process.env.PORT,
  console.log(`App is listening on http://localhost:${process.env.PORT}`)
);
