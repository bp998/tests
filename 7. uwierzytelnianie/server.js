import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import api from "./routes/index.js";

dotenv.config();

const { SECRET, DB_HOST } = process.env;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", api);

const connection = mongoose.connect(DB_HOST);

connection.then(() => {
  app.listen(3000, () => {
    console.log("Server is listening on port 3000");
  });
});

const payload = {
  id: "123",
  username: "John",
};

// logowanie za pomoca jwt // token jest nieaktywny po 12h
const token = jwt.sign(payload, SECRET, { expiresIn: "12h" });

try {
  const decoded = jwt.verify(token, SECRET);
  console.log(decoded);
} catch (error) {
  console.log(error);
}
