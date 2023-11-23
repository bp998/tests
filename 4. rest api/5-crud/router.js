const express = require("express");

const router = express.Router();

let tasks = [
  {
    id: 1,
    title: "New title",
    text: "text of my task",
    done: true,
  },
  {
    id: 2,
    title: "New title",
    text: "text of my task",
    done: false,
  },
  {
    id: 3,
    title: "New title",
    text: "text of my task",
    done: false,
  },
];

router.get("/tasks", (req, res) => {
  res.json({ tasks, itemCount: tasks.length });
});

// GET TYLKO DO POBIERANIA/ODCZYTYWANIA DANYCH

router.get("/tasks/:id", (req, res, next) => {
  const { id } = req.params;
  const [task] = tasks.filter((el) => el.id === parseInt(id));
  if (!task) {
    res.status(404).json({ message: "Not found..." });
  } else {
    res.json(task);
  }
});

// POST DO TWORZENIA NOWEGO ZASOBU

router.post("/tasks", (req, res) => {
  const { title, text } = req.body;
  const id = tasks.length + 1;
  const task = {
    id,
    title,
    text,
    done: false,
  };
  tasks.push(task);
  res.status(201).json(task);
});

// DELETE DO USUWANIA ZASOBU

router.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const newTasks = tasks.filter((el) => el.id !== parseInt(id));
  const taskToDelete = tasks.find((el) => el.id === parseInt(id));
  tasks = [...newTasks];
  if (!taskToDelete) {
    res.status(404).json({ message: "record not found..." });
  } else {
    res.status(204).json({ message: "record deleted" });
  }
  //   res.status(404).json({ message: "Not found..." });
});

// PUT ALBO UTWORZYC ALBO ZAAKTUALIZOWAC ZASOB JESLI ISTNIEJE O KONKRETNYM ID

router.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, text } = req.body;
  const task = tasks.find((el) => el.id === parseInt(id));
  if (task) {
    task.title = title;
    task.text = text;
    res.status(200).json(task);
  } else {
    const task = {
      id: parseInt(id),
      title,
      text,
      done: false,
    };
    tasks.push(task);
    res.status(201).json(id);
  }
});

// PATCH DO AKTUALIZACJI STANU BAZY DANYCH

router.patch("/tasks/:id/status", (req, res, next) => {
  const { id } = req.params;
  const { done } = req.body;
  const task = tasks.find((el) => el.id === parseInt(id));
  if (task) {
    task.done = done;
    res.status(200).json({ message: "updated" });
  } else {
    res.status(404).json({ message: "not found" });
  }
});

module.exports = router;
