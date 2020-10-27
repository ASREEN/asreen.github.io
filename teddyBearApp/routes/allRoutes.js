const express = require('express');
const router = express.Router();
const controller = require('../controller/indexController')
var multer = require('multer');
//const controller=require('../')
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
// routes
router.get("/", controller.main);
router.get("/checkout", controller.checkOut)
router.get("/product",)
router.get("/about", controller.about)
router.get("/contact", controller.contactGet)
router.get("/payment", controller.payment)
router.get("/shop", controller.shop)
router.get('/seeMoreInfo/:id', controller.seeMoreInfo)
router.get("/updateUser/:id", controller.updateUser);
router.post('/updateUser/:id', uploadPic.single('file'), controller.updateUserPost)
router.get("/service", controller.service)
router.get("/single", controller.single)
router.get("/login", controller.login)
router.post("/login", controller.checkUser);
router.get("/logout", controller.logout)
router.get("/account", controller.account)
router.post("/signup", uploadPic.single('avatar'), controller.signup);
router.post("/newItem", uploadPic.single('newItem'), controller.newItemPost);
router.get('/sendMsgProvider', controller.sendMsgGet)
router.post('/sendMsgProvider', controller.sendMsgProvider)
router.post('/searchItem', controller.searchItemPost)
router.post('/sendContactEmail', controller.sendEmailPost)
router.post('/addComment/:id/:proName', controller.addComment);
router.post('/contact', controller.contactPost)

module.exports = router;