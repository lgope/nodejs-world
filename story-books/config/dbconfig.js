const mongoose = require('mongoose');
const chalk = require('chalk');

const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(`${chalk.green('MongoDB Connected:')} ${conn.connection.host}`);
  } catch (error) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectMongoDB;
