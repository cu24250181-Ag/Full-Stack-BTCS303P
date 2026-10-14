const express = require('express');
const tasks = require('../data/tasks');
const authCheck = require('../middleware/auth');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(tasks);
});

router.get('/:id', (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({
      success: false,
      message: 'Task not found'
    });
  }

  res.json(task);
});

router.post('/', authCheck, (req, res) => {
  const { title, completed } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: 'Title is required'
    });
  }

  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    completed: Boolean(completed)
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.put('/:id', authCheck, (req, res) => {
  const taskId = Number(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Task not found'
    });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...req.body,
    id: taskId
  };

  res.json(tasks[taskIndex]);
});

router.delete('/:id', authCheck, (req, res) => {
  const taskId = Number(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Task not found'
    });
  }

  const [deletedTask] = tasks.splice(taskIndex, 1);
  res.json({
    success: true,
    message: 'Task deleted',
    data: deletedTask
  });
});

module.exports = router;
