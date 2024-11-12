const express = require("express");
const app = express();
const dbServer = require("./helpers/dbServer");
const cors = require("cors");
require("dotenv").config();

const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

//Routes
const path = "/api";
app.use(path, routes);

app.get("/", (req, res) => {
  res.send("Welcome to Tonic Commerce");
});

// Connect Database and Start Server
dbServer.start(app);