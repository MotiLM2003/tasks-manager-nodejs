const express = require('express');
const router = new express.Router('/users');
const User = require('../models//user.js');
router.post('/users', async (req, res) => {
  const use = new User(req.body);
  const user = await use.save();
  res.status(201).send(user);
});

router.get('/users/', async (req, res) => {
  console.log('request');
  const users = await User.find();
  console.log(users);
  res.status(200).send(users);
});

router.get('/users/:id', async ({ params: { id } }, res) => {
  const user = await User.findById(id);
  console.log(user);
  res.status(201).send(user);
});

router.patch('/users/:id', async (req, res) => {
  const { id } = req.params;
  const updates = Object.keys(req.body);
  console.log(id);
  try {
    // const user = await User.findByIdAndUpdate(id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    const user = await User.findById(req.params.id);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (err) {
    console.log(err);
    rs.status(400).send({ message: err });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    const response = await User.findByIdAndDelete(req.params.id);
    res.send(response);
  } catch (err) {
    res.status(404).send({ err: err });
  }
});

module.exports = router;
