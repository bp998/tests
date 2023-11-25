const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: 2,
      maxlength: 70,
      required: [true, "Title is required"],
    },
    text: {
      type: String,
      minlength: 3,
      maxlength: 170,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Task = mongoose.model("task", taskSchema, "tasks");

module.exports = Task;
