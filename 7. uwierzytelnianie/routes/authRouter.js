import express from "express";

const router = express.Router();

router.post("/register", (req, res) => {
  res.json({ message: "register" });
});

router.post("/login", (req, res) => {
  res.json({ message: "login" });
});

export default router;
