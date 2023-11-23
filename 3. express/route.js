const express = require("express");
const app = express();
const routes = require("./router");

const middleware = (req, res, next) => {
  console.log("middleware");
  next();
};

app.listen(3000, () => {
  console.log("listening on port 3000");
});

app.use("/api", middleware, routes);

app.get("/", (req, res) => {
  res.send("main path");
});
