const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const passport = require('./config/passportConfig');
const userRouter = require('./routes/userRoutes');

const app = express();

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use('/users', userRouter);



module.exports = app;