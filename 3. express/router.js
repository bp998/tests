const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("main path to router");
});

router.get("/about", (req, res) => {
  res.send("about path to router");
});

module.exports = router;
