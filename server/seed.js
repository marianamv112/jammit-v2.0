const mongoose = require('mongoose');
const User = require('./models/user');

mongoose
  .connect('mongodb://localhost:27017/jammit-v2-tests', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch(err => console.error('Error connecting to mongo', err));

  const users = [
    {
        "username": "johndoe",
        "email": "example@example.com",
        "password": "$2a$10$d1HCYG1cCT3MigSSU5/QIulsNcAz1aW/X5X2TqSbI5cTPxdjGO4HW",
        "status": "Pending",
        "confirmationCode": "validationCode"
    }
  ];

  User.create(users)
  .then(usersFromDB => {
    console.log(`Created ${usersFromDB.length} users`);
    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating users from the DB: ${err}`));