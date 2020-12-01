const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const flash = require('connect-flash');
const dotenv = require('dotenv').config();
const hbs = require('hbs');

const PORT = process.env.PORT || 4000;
var session = require('express-session');
const allRoutes=require('./routes/allRoutes')
const url = require('url')
const path = require('path');
var multer = require('multer');

// function check the image type
const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, 'public/uploads') },
  filename: function (req, file, cb) { cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) },
});
let fileFilter = function (req, file, cb) {
  let allowedMimes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    return cb(
      message = 'Invalid file type. Only jpg,jpeg png image files are allowed.'
      , false);
  }
};
let obj = {
  storage: storage,
  limits: {
    fileSize: 200 * 1024 * 1024
  },
  fileFilter: fileFilter
};
const uploadPic = multer(obj);
let msg = false;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.text())
app.use(flash())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 1000 * 24 * 60 * 60 }
}));
// setup Multer
// connect to Database
let mongoDbUrl = process.env.mongoURL;
mongoose.connect(mongoDbUrl, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => { console.log('MongoDB is connected ...') })
  .catch((err) => { console.log(err) })
mongoose.set('useCreateIndex', true)
//set up a static folder
app.use(express.static(`${__dirname}/public`));
//set up template engine
app.set("view engine", "hbs");
//Routes
app.use('/',allRoutes)
// listen to the PORT 4000
app.listen(PORT, () => {
  console.log('The server listining to port ', PORT)
})
// Partials
hbs.registerPartials(__dirname + '/views/partials/')
hbs.registerPartial('carousel', 'carousel.hbs')
hbs.registerPartial('contactSection', 'contactSection.hbs')
// middleware

