const mongoose = require('mongoose');
const chalk = require('chalk');
const dotenv = require('dotenv');

dotenv.config({
  path: './config.env',
});
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

// Mongo Atlas connection
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log(chalk.bgGreen('DB connection successful!')))
  .catch((err) => console.log(chalk.redBright(`error :\n${err}`)));

const port = process.env.PORT | 3000;

app.listen(port, () =>
  console.log(`server is listening at ${chalk.greenBright(port)}`)
);
