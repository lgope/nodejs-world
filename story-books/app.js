const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const chalk = require('chalk');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const connectMongoDB = require('./config/dbconfig');

// routes
const indexRoute = require('./routes/index');
const authRoute = require('./routes/authRoute');

// load config
dotenv.config({ path: './config/config.env' });

// passport config
require('./config/passportConfig')(passport);

// connect mongo db
connectMongoDB();

const app = express();

// body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// To see requested url in the console. Just in dev mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));

  // handlebars Helpers
  //   const {
  //     stripTags,
  //     formatDate,
  //     truncate,
  //     select,
  //     editIcon,
  //   } = require('./helpers/hbs');

  // handlebars
  app.engine(
    '.hbs',
    exphbs({
      //   helpers: {
      //     stripTags,
      //     formatDate,
      //     editIcon,
      //     select,
      //     truncate,
      //   },
      defaultLayout: 'main',
      extname: '.hbs',
    })
  );
  app.set('view engine', '.hbs');
}

// sessions stuff
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// static file
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoute);
app.use('/auth', authRoute);

const port = process.env.PORT || 3000;
app.listen(
  port,
  console.log(
    `Server running in ${chalk.bgGreen(
      process.env.NODE_ENV
    )} mode on port ${chalk.greenBright(port)}`
  )
);
