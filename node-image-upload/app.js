const express = require('express');
const ejs = require('ejs');
const chalk = require('chalk');
const uploadRoutes = require('./routes/uploadRoutes');


// Init app
const app = express();

// EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static('./public/'));

app.get('/', (req, res) => res.render('index'));

app.use('/upload', uploadRoutes);


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${chalk.greenBright(port)}`));