const express = require('express');
const router = new express.Router();
const Task = '../models/task.js';

router.post('/tasks', async ({ body: task }, res) => {
  const newTask = new Task(task);
  const result = await newTask.save();
  res.status(201).send(result);
});

router.get('/tasks', async (req, res) => {
  const task = await Task.find();
  res.status(200).send(task);
});

router.get('/tasks/:id', async (req, res) => {
  try {
    const response = await Task.findById(req.params.id);
    if (!response) {
      res.status(400).send({ error: 'task not found.' });
    }
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['completed'];
  const isValid = updates.every((update) => allowedUpdates.includes(update));
  try {
    if (isValid) {
      const user = await Task.findByIdAndUpdate(req.params.id, req.body);
      res.send(user);
    } else {
      res.status(400).send({ error: 'invalid update fields' });
    }
  } catch (err) {
    res.status(400).status({ err });
  }
});

router.delete('/tasks/:id', async (req, res) => {
  try {
    const response = await Task.findByIdAndDelete(req.params.id);
    res.send(response);
  } catch (error) {
    res.status(404).send({ error });
  }
});

module.exports = router;
