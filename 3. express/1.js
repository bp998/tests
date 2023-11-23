const express = require("express");
const app = express();
const path = require("path");
const port = 3000; // default port to listen
const data = require("./data.json");

app.use((req, res, next) => {
  console.log("request received", req.originalUrl);
  next();
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/login", (req, res) => {
  console.log(req.body);
  res.json(req.body);
  //   console.log(req);
  //   res.json(req.body);
});

app.get("/json", (req, res) => {
  res.json(data);
});

// path params
app.get("/contact/:id", (req, res) => {
  console.log(req.params);
  res.send(`<h1>Contact with id ${req.params.id}</h1>`);
});

// query params
// user?name=jan&surname=kowalski
app.get("/user", (req, res) => {
  res.send(JSON.stringify(req.query));
  //   console.log(req.query, "req.query");
});

app.get("/contact", (req, res) => {
  res.send(`<form action=/contact/:id method=get>
  <button type=submit>Wprowadz liczbe</button>
  <input type=text name=id>
  </form>`);
  console.log(req.query);
});

// app.get("/test", (req, res) => {
//   console.log("im a test");
//   res.send("test!");
// });
