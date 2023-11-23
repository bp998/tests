const express = require("express");
const cors = require("cors");

const app = express();

// fetch("http://localhost:3000/").then(req => req.text()).then(console.log)

const corsOptions = {
  origin: ["http://localhost:3000", "https://www.google.com"],
  methods: ["GET, POST, DELETE"],
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("GET");
});

// fetch("http://localhost:3000/", {method: 'POST'}).then(req => req.text()).then(console.log)
app.post("/", (req, res) => {
  res.send("POST");
});

// fetch("http://localhost:3000/", {method: 'DELETE'}).then(req => req.text()).then(console.log)
app.delete("/", (req, res) => {
  res.send("DELETE");
});

app.listen(3000, () => {
  console.log("listening");
});
