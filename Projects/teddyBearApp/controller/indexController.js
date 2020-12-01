const Email = require('../model/emailModel')
const Comment = require('../model/comments')
const contactEmail = require('../model/contactEmail')
const Toy = require('../model/toys')
const User = require('../model/users');
const ContactInfo = require('../model/contact');
const sendEmail = require('../utils/sendEmail')
const output = require('../public/outputEmail')
const crypto = require('crypto')

exports.main = (req, res) => {
  console.log(req.session);
  // console.log(req.sessionID)
  if (!req.session.viewsCount) {
    req.session.viewsCount = 1;
    console.log("Welcome to this page for the first time!");
  } else {
    req.session.viewsCount += 1;
    console.log("You visited this page " + req.session.viewsCount + " times");
  }
  res.render("index", { title: 'Teddy Bear App' });
}
exports.seeMoreInfo = (req, res) => {
  let id = req.params.id;
  // console.log('id',id);
  Toy.findById(id, (err, data) => {
    if (err) console.log(err)
    else {
      // console.log('products',data)
      res.render('single', { title: 'single-page', toy: data })
    }
  })
}
exports.updateUser = (req, res) => {
  userId = req.params.id;
  console.log(userId)
  User.findById(userId, (err, doc) => {
    if (err) throw err;
    userData = doc;
    console.log('data updated', "userData :" + userData);
    res.render('userInfo', { userData, userId });
  })
}
exports.updateUserPost = (req, res) => {
  userId = req.params.id;
  let file = req.file;
  console.log(userId)
  console.log('file', file)
  console.log('req.body', req.body);
  let userInfo = req.body;
  let user = {
    imagePath: 'uploads/' + file.filename,
    ...userInfo
  }
  User.findByIdAndUpdate(userId, user, (err, doc) => {
    if (err) throw err;
    userData = doc;
    console.log('data updated', "userData :" + userData);
    res.render('account', { user, msg: 'Your Account is updated successfully' });
  })
}
exports.login = (req, res) => {
  if (!req.session.userLogin)
    res.render('login', { title: 'login-page', msg: req.flash('msg') })
  else res.redirect('account')
}
exports.checkUser = (req, res) => {
  console.log('req.body', req.body);
  let userFound = false;
  User.find((err, data) => {
    if (err) console.log(err)
    // console.log('data',data)
    data.map((item) => {
      if (item.email == req.body.email && item.pswd == req.body.pswd) {
        userFound = true;
        req.session.userLogin = item;
        console.log('req.session', req.session)
        req.session.save();
      }
    });
    if (userFound) {
      res.redirect('/shop')
    }
    else {
      console.log('userFound', userFound);
      req.flash('msg', 'Email or password is invalid ')
      res.redirect('login')
    }
  })
}
exports.logout = (req, res) => {
  req.session.destroy();
  console.log('req.session', req.session)// remove session and go to login page
  res.redirect("/login")
}
exports.account = (req, res) => {
  if (req.session.userLogin) {
    console.log('req.session', req.session.userLogin)
    User.findOne({ email: req.session.userLogin.email }, (err, data) => {
      if (err) throw err;
      console.log("data", data)
      res.render('account', { user: data, title: 'Account page' })
    })
  }
  else {
    req.flash('msg', 'please try to login first')
    res.redirect('login')
  }
}
exports.signup = (req, res) => {
  console.log(req.body);
  const file = req.file;
  console.log('*save file info*')
  // console.log(file)
  //console.log(req.body);
  let userInfo = req.body;
  let userObject = {
    imagePath: 'uploads/' + file.filename,
    ...userInfo
  }
  let newUser = new User(userObject);
  newUser.save(() => { console.log('Data is saved in DB') })
  res.render("Login", { title: 'login-page', name: req.body.uname });
}
exports.newItemPost = (req, res) => {
  console.log(req.body);
  const file = req.file;
  console.log('*save file info*')
  console.log('file', file)
  console.log('req.body', req.body);
  let itemInfo = req.body;
  let item = {
    imagePath: 'uploads/' + file.filename,
    ...itemInfo
  }
  console.log(item)
  let newItem = new Toy(item);
  newItem.save(() => { console.log('Data is saved in DB') })
  res.redirect("/shop");
}
exports.sendMsgProvider = (req, res) => {
  const { name, email, message } = req.body;
  console.log('user email:', req.body.email);
  //generate authentication token
  var seed = crypto.randomBytes(20);
  var authToken = crypto.createHash('sha1').update(seed + req.body.email).digest('hex');
  console.log('autToken', authToken)
  var newEmail = new Email({
    name,
    email,
    message,
    authToken,
  });
  newEmail.save(function (err, newEmail) {
    if (err) {
      return console.error(err);
    }
    console.log('new contact user', newEmail);
  });
  sendEmail(
    to = 'ilyasasreen@gmail.com',//newEmail.email
    from = 'ilyasasreen@gmail.com',
    subject = 'Offer a price',
    html = output(name, email, message)
  );
  req.flash('msg', 'Thank you for your message. We will send your Email to the provider.')
  res.redirect('/sendMsgProvider')
}
exports.searchItemPost = (req, res) => {
  let items = []
  let item = req.body.search;
  console.log('item', item)
  Toy.find((err, data) => {
    if (err) throw err;
    data.map(toy => {
      if (toy.category == item || toy.proName == item) {
        console.log(toy.category, toy.proName, item)
        items.push(toy)
      }
    })
    if (items !== []) {
      console.log('array items', items)
      let itemsBuy = [], itemsSale = [];
      for (let item of items) {
        if (item.saleBuy == 'buy') itemsBuy.push(item);
        else itemsSale.push(item)
      }
      res.render('shop', { toyBuy: itemsBuy, toySale: itemsSale });
    }
    else console.log('no such item')
  })
}
exports.sendEmailPost = (req, res) => {
  let email = req.body.email;
  let newEmail = new contactEmail({ email })
  newEmail.save((err, data) => {
    if (err) throw err;
    console.log('email saved in DB', data)
    res.redirect('/contact')
  })
}
exports.addComment = function (req, res) {
  let productId = req.params.id;
  let newComment = new Comment({
    comment: req.body.comment,
    product_name: req.params.proName,
    product_id: productId
  });
  newComment.save(function (err, data) {
    if (err) throw err
    Toy.findOneAndUpdate({ _id: productId },{ $push: { comments: data._id }},
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      })
      .populate('Comment')
    console.log('comment saved in DB')
    res.redirect('/shop');
  });
}
exports.contactPost = (req, res) => {
  let { name, email, phone, message } = req.body;
  let newContact = new ContactInfo({ name, email, phone, message });
  newContact.save((err, data) => {
    if (err) throw err;
    console.log('Contact Information saved in DB')
    req.flash('msg', 'Thank you , we will contact with you soon...')
    res.redirect('/contact')
  })
}
exports.service = (req, res) => {
  res.render('service', { title: 'Service-page' })
}
exports.single = (req, res) => {
  res.render('single', { title: 'single-page' })
}
exports.shop = (req, res) => {
  let buyItems = [];
  let saleItems = [];
  Toy.find((err, data) => {
    if (err) console.log(err)
    else {
      data.map(item => {
        if (item.saleBuy == 'buy') { buyItems.push(item) }
        else saleItems.push(item)
      })
      // console.log('products',data)
      res.render('shop', { title: 'shop-page', toySale: saleItems, toyBuy: buyItems })
    }
  })
}
exports.payment = (req, res) => {
  res.render('payment', { title: 'payment-page' })
}
exports.contactGet = (req, res) => {
  res.render('contact', { title: 'contact-page', msg: req.flash('msg') })
}
exports.about = (req, res) => {
  res.render('about', { title: 'about-page' })
}
exports.product = (req, res) => {
  res.render('product', { title: 'product-page' })
}
exports.checkOut = (req, res) => {
  res.render('checkout', { title: 'checkout-page' })
}
exports.sendMsgGet = (req, res) => {
  res.render('sendEmail', { title: 'send message', msg: req.flash('msg') })
}