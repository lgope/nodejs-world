const mongoose = require('mongoose');
const chalk = require('chalk');

const app = require('./app');
const User = require('./model/userModel');

mongoose
  .connect('mongodb://localhost/pagination-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'))
  .catch(err => console.log(chalk.redBright(err)));


const db = mongoose.connection;
db.once('open', async () => {
  if ((await User.countDocuments().exec()) > 0) return;

  Promise.all([
    User.create({ name: 'User 1' }),
    User.create({ name: 'User 2' }),
    User.create({ name: 'User 3' }),
    User.create({ name: 'User 4' }),
    User.create({ name: 'User 5' }),
    User.create({ name: 'User 6' }),
    User.create({ name: 'User 7' }),
    User.create({ name: 'User 8' }),
    User.create({ name: 'User 9' }),
    User.create({ name: 'User 10' }),
    User.create({ name: 'User 11' }),
    User.create({ name: 'User 12' }),
  ]).then(() => console.log('Added Users 🙂'));
});

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`Server running at ${chalk.greenBright(port)}`)
);
