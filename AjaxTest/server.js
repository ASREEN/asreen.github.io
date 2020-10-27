const express = require('express');
const app = express();
const hbs = require('hbs');
const axios = require('axios')
const fetch = require('node-fetch')
const bodyParser = require('body-parser');
var products = [
    {
        id: 1,
        name: 'laptop'
    },
    {
        id: 2,
        name: 'microwave'
    }
];
var currentId = 2;
const PORT = process.env.PORT || 3000;
// // Static folder setup
app.use(express.static(__dirname + '/public'));
// // View Engine setup
app.set('view engine', 'hbs');
app.use(bodyParser.json());
// rautes
app.get('/', function (req, res) {
    res.render('index');
});
app.get('/products', function (req, res) {
    res.send({ products: products });
});
app.post('/products', function (req, res) {
    var productName = req.body.name;
    currentId++;
    products.push({
        id: currentId,
        name: productName
    });
    res.send('Successfully created product!');
});
app.put('/products/:id', function (req, res) {
    var id = req.params.id;
    console.log(id)
    var newName = req.body.newName;
    // var found = false;
    products.forEach(function (product, index) {
        if (product.id === Number(id)) {
            product.name = newName;
        }
    });
    res.send('Succesfully updated product!');
});
app.delete('/products/:id', function (req, res) {
    var id = req.params.id;
    var found = false;
    products.forEach(function (product, index) {
        if (!found && product.id === Number(id)) {
            products.splice(index, 1);
        }
    });
    res.send('Successfully deleted product!');
});

// listen to PORT 3000
app.listen(PORT, function () {
    console.log('Server listening on ' + PORT);
});