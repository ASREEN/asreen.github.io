const express = require("express");
const app = express();
const fs = require('fs')
const port = 4400;
const hbs = require('hbs');
const fetch = require('node-fetch');
const path = require("path");
const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://Admin:Asreen1981@asreen-cluster.miipv.mongodb.net/usersData', {useUnifiedTopology: true,useNewUrlParser: true})
         .then(()=>{console.log('MongoDB is connected ...')})
         .catch((err)=>{console.log(err)})
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');
// setup a template engines
app.set('view engine', 'hbs')
//Routes
app.get('/',(reg,res)=>{
  fetch('https://jsonplaceholder.typicode.com/users')
  .then(res => res.json())
  .then(json => {
    console.log(json);
    res.render('index',{users: json});
  })
}) 
app.get('/user/:id', function(req, res) {  // user/1
  var id = req.params.id;
  console.log(id)
  fetch('https://jsonplaceholder.typicode.com/users/'+id)
  .then(res => res.json())
  .then(json => {
    console.log(json);
    res.render('user',{user: json});
  })
});
hbs.registerHelper('big',(data)=>{
  return data.toUpperCase();
});
hbs.registerHelper('ifeq',function(val1,val2,options){
  return (val1 == val2) ? options.fn(this): options.inverse(this)
});
hbs.registerHelper('ifnoteq', function (a, b, options) {
  return (a != b)? options.fn(this): options.inverse(this)
});
hbs.registerHelper('checkKey', function(key,value,options){
  switch(key){
    case 'company':return (key==value)? options.fn(this) : options.inverse(this);
    case 'address':return (key==value)? options.fn(this) : options.inverse(this);
    case 'id' || 'name' || 'username' || 'email': return options.fn(this)
  }
})
//listen
app.listen(port, () => {
    console.log(`Server is Running at http://localhost:${port}`)
  })

