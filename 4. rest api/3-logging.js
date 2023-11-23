const logger = require("morgan");
const express = require("express");

const app = express();

// app.use(logger("combined"));
// app.use(logger("dev"));
// app.use(logger("common"));
// app.use(logger("short"));
// app.use(logger("tiny"));
app.use(logger(":method :url"));

app.get("/", (req, res) => {
  res.send("");
});

app.listen(3000, () => {
  console.log("listening");
});
