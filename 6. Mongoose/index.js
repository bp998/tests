const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const routerApi = require("./api");

require("dotenv").config();

const app = express();

const { DB_HOST: uriDb } = process.env;

const connection = mongoose.connect(uriDb);

app.use(express.json());
app.use(cors());

app.use("/api", routerApi);

app.use((req, res) => {
  res.status(404).json({ message: `whoops 404 ${req.path}` });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const startServer = async () => {
  try {
    await connection;
    console.log("db connected");
    await app.listen(3000, () => {
      console.log("Server started listening on port 3000");
    });
  } catch (err) {
    console.log("db not connected");
    process.exit(1);
  }
};

startServer();
