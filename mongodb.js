const { MongoClient, ObjectID } = require('mongodb');

const connection = 'mongodb://127.0.0.1:27017';
const database = 'task-manager';

// const id = new ObjectID();
// console.log(id);
// console.log(id.getTimestamp());

MongoClient.connect(
  connection,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log('error:', error);
    }
    const db = client.db(database);

    db.collection('users')
      .deleteOne({ _id: new ObjectID('5fec71b235576704083fda8e') })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    // db.collection('users')
    //   .updateOne(
    //     { _id: new ObjectID('5fec71b235576704083fda8e') },
    //     {
    //       $inc: { Age: 1 },
    //     }
    //   )
    //   .then((result) => {
    //     // console.log(result);
    //   });

    // db.collection('users').findOne(
    //   { _id: new ObjectID('5fec71b235576704083fda8e') },
    //   (err, user) => {
    //     console.log(user);
    //   }
    // );

    // db.collection('users')
    //   .find({ Age: 42 })
    //   .toArray((err, users) => {
    //     console.log(err);
    //     console.log(users);
    //   });
    // db.collection('users').insertOne(
    //   { _id: id, name: 'Lord of Rage ', Age: 23 },
    //   (error, result) => {
    //     console.log('new line  add', result.ops);
    //   }
    // );

    // db.collection('users').insertMany(
    //   [
    //     {
    //       name: 'Rami',
    //       age: 44,
    //     },
    //     { name: 'Liat', age: 23 },
    //   ],
    //   (error, result) => {
    //     console.log('new line  add', result.ops);
    //   }
    // );

    console.log('connected to database');
  }
);
