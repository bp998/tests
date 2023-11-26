import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { SECRET } = process.env;

const payload = {
  id: "123",
  username: "John",
};

// logowanie za pomoca jwt // token jest nieaktywny po 12h
const token = jwt.sign(payload, SECRET, { expiresIn: "12h" });

console.log(token);
