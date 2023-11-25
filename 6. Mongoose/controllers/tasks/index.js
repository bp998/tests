const { fetchTasks, fetchTask, insertTask } = require("./helpers");

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await fetchTasks();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

const getTask = async (req, res, next) => {
  try {
    const task = await fetchTask(req.params.id);
    if (task) {
      res.json(task);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const createTask = async (req, res, next) => {
  const { title, text } = req.body;
  try {
    const result = await insertTask({ title, text });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllTasks, getTask, createTask };
