const express = require('express');
const {
  addTask,
  getTasks,
  moveTask,
  completeTask,
  deleteTask,
  updateTask,
} = require('../controllers/taskController');
const router = express.Router();

router.post('/', addTask);
router.get('/', getTasks);
router.patch('/movetask/:id', moveTask);
router.patch('/completetask/:id', completeTask);
router.delete('/deletetask/:id', deleteTask);
router.patch('/updatetask/:id', updateTask);

module.exports = router;
