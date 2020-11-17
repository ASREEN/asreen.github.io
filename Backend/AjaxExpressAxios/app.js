const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const routes = require('./routes');
const user = require('./routes/user');
const hbs = require('hbs')
const session = require('express-session');
const url = require('url');
const axios = require('axios')
const fs = require('fs');
const path = require('path');
const multer = require('multer')
const request = require('request');
const fetch = require('node-fetch');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 1000 * 24 * 60 * 60 }
}));
// setup Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, 'public/uploads') },
  filename: function (req, file, cb) { cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) },
});
const upload = multer({ storage: storage })
//set up a static folder
app.use(express.static(`${__dirname}/public`));
//set up template engine
app.set("view engine", "hbs");
var users;
//get methods
// app.get('/', routes.index);
app.get('/', function (req, res) { res.render('index') });

// sent a GET request
app.get('/getUsersData', (req, res) => {
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      // console.log('members', response.data);
      data = response.data;
      res.send({ data: response.data })
    });
})
app.get('/checkEmail/:email', (req, res) => {
  let email = req.params.email;
  console.log('email:', email);
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
       console.log('members', response.data);
      users = response.data;
      users.forEach(user=>{
        // console.log(user.email)
        if (email == user.email) {
          info = `<div class="container"><h1 class="text-danger text-center">We find you! </h1>
                     <h3 class="text-info text-italic text-center"><b class="text-secondary">${user.name}</b></h3>
                     <h1 class="text-warning">Id  :<b class="text-info"> ${user.id} </b></h1>
                     <h2 class="text-warning d-block">Name:<b class="text-info"> ${user.name}</b> </h2>
                     <h2 class="text-warning d-block">Email:<b class="text-info"> ${user.email} </b></h2>
                  </div>
            `;
            res.json(info);
        }
        // else {
        //  
        // }
      
      })
      info = '<h1>No user Found sorry!</h1>'
      res.send(info)
    })
});

//listen to the port 3000
app.listen(3000, (err) => {
  if (err) throw err;
  console.log('Server side on port 3000...')
})