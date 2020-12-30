const express = require('express');
require('./db/mongoose');
const app = express();
const User = require('./models/user');
const Task = require('./models/task');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(PORT, () => {
  console.log(`server is up on port ${PORT}`);
});

const bcrypt = require('bcryptjs');

const test = async () => {
  const password = 'Moti2003';
  const hashedPassword = await bcrypt.hash(password, 8);
  console.log(hashedPassword);
  const isMatch = await bcrypt.compare(password, hashedPassword);
  console.log(isMatch);
};

test();
