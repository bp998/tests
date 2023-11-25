const Task = require("../../models/Task");

const fetchTasks = () => Task.find();

const fetchTask = (id) => Task.findOne({ _id: id });

const insertTask = ({ title, text }) => Task.create({ title, text });

module.exports = { fetchTasks, fetchTask, insertTask };
