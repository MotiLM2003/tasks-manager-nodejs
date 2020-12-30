const connection = 'mongodb://127.0.0.1:27017/tasks-manager-api';
const database = 'task-manager';

const mongoose = require('mongoose');
mongoose.connect(
  connection,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },

  () => {
    console.log('connected to database');
  }
);
