const express = require('express');
//make an application from express() top-level function
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = 5000;
const HOST = 'localhost';
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const controller=require('./controllers/indexController')
// models
const Product = require('./models/Product');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
// body parser use
app.use(bodyParser.urlencoded({extended: true}));
// connect-flash use
app.use(session({
    secret: process.env.SECRET||'my secret',
    resave:false,
    saveUninitialized:false,
    cookie: {
        maxAge: 60000*60*24 // 1 day
    }
}));
app.use(flash());
// connect DB
mongoose.connect(process.env.MongoURL, { useUnifiedTopology: true, useNewUrlParser: true})
.then(()=> {
    console.log('MongoDB database is connected........');
})
.catch((error)=> {
    console.log('Database is not connected because:' + error.message)
});
// View engine setup
app.set('view engine', 'hbs');
// Routes
app.get('/',controller.allProducts );
app.post('/filter',controller.filter)
app.post('/product/create',controller.createItem )
app.get('/deleteItem/:id',controller.deleteItem)
app.listen(PORT, HOST, ()=> {
    console.log(' The Server is running on ' + HOST + ':' + PORT )
})