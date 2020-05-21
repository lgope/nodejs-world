const multer = require('multer');
const path = require('path');

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

// Check File Type
function checkFileType(req, file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: checkFileType,
}).single('myImage');

exports.uploadImages = (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.render('index', {
        message: err,
      });
    } else {
      if (req.file == undefined) {
        res.render('index', {
          message: 'Error: No File Selected!',
        });
      } else {
        res.render('index', {
          message: 'Success: File Uploaded!',
          file: `uploads/${req.file.filename}`,
        });
      }
    }
  });
};
