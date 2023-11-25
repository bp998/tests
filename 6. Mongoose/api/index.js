const express = require("express");
const router = express.Router();
const tasks = require("../controllers/tasks");

router.get("/tasks", tasks.getAllTasks);
router.get("/tasks/:id", tasks.getTask);
router.post("/tasks", tasks.createTask);

module.exports = router;
