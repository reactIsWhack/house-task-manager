const Task = require('../models/taskModel');
const asyncHandler = require('express-async-handler');

const addTask = asyncHandler(async (req, res) => {
  const { name, type, week } = req.body;

  // type value determines if the task is weekly or monthly

  // Validation

  if (!name || !type || !week) {
    res.status(400);
    throw new Error('Please fill in all fields');
  }

  if (type !== 'monthly' && type !== 'weekly') {
    res.status(400);
    throw new Error('Invalid value for type');
  }

  const sortingObj = {
    monthly: type === 'monthly' ? true : false,
    weekly: type === 'weekly' ? true : false,
  };

  // sortingObj uses the type value to assign a task to either be a monthly or weekly task
  // when querying for both types of tasks, this obj would be used to sepearte the monthly from the weekly

  const task = await Task.create({ name, sorting: sortingObj, week });

  if (task) {
    res.status(201).json(task);
  } else {
    res.status(500);
    throw new Error('Could not create task');
  }
});

const getTasks = asyncHandler(async (req, res) => {
  const monthlyTasks = await Task.find({
    sorting: { monthly: true, weekly: false },
  });
  const weeklyTasks = await Task.find({
    sorting: { monthly: false, weekly: true },
  });
  const bothTasks = await Task.find({
    sorting: { monthly: true, weekly: true },
  });

  // merged tasks contains all the weekly tasks, and monthly tasks that were moved into the weekly tasks.
  // When a monthly task is moved, it must also stay in the monthly tasks array hence the spread operator

  if (monthlyTasks && weeklyTasks && bothTasks) {
    res.status(200).json({
      mergedTasks: [...weeklyTasks, ...bothTasks],
      monthlyTasks: [...monthlyTasks, ...bothTasks],
    });
  } else {
    res.status(500);
    throw new Error('Could not get tasks');
  }
});

const moveTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { week } = req.body;

  if (!week) {
    res.status(400);
    throw new Error('Please add a week');
  }

  const task = await Task.findById(id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  console.log(task);

  task.sorting = {
    monthly: true,
    weekly: true,
  };
  task.week = week;
  const updatedTask = await task.save();

  if (updatedTask) {
    res.status(200).json(updatedTask);
  } else {
    res.status(500).json('Task unable to be updated');
  }
});

const completeTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  task.completed = true;
  const updatedTask = await task.save();

  if (updatedTask) {
    res.status(200).json(updatedTask);
  } else {
    res.status(500);
    throw new Error('Failed to update task');
  }
});

const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  await task.deleteOne();

  res.status(200).json({ msg: 'Task Deleted' });
});

const updateTask = asyncHandler(async (req, res) => {
  const { name, week } = req.body;
  const { id } = req.params;

  const task = await Task.findById(id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  task.name = name || task.name;
  task.week = week || task.week;
  const updatedTask = await task.save();

  if (updatedTask) {
    res.status(200).json(updatedTask);
  } else {
    res.status(500);
    throw new Error('Failed to update task');
  }
});

module.exports = {
  addTask,
  getTasks,
  moveTask,
  completeTask,
  deleteTask,
  updateTask,
};
