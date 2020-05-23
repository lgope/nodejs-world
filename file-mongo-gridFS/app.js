const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const chalk = require('chalk');

const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

const mongoDBURL = 'mongodb://localhost/mongo-file-uploads'
const dbConn = mongoose.createConnection(
 mongoDBURL ,
  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  }
);

let gfs;
dbConn.once('open', () => {
  // Init stream
  gfs = Grid(dbConn.db, mongoose.mongo);
  gfs.collection('uploads');
  // all set!
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoDBURL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

app.get('/', (req, res) => {
  res.render('index');
});

// @route POST /upload
// @desc  Uploads file to mongoDB
app.post('/upload', upload.single('file'), (req, res) => {
    // res.json({ file: req.file });
    res.redirect('/');
  });
  

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server is runnig on port ${chalk.greenBright(port)}`)
);
