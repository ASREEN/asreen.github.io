const User = require('./model/schema');
const Email = require('./model/emailModel');
const Product = require('./model/productModel');

exports.homePage = (req, res) => {
    // console.log(req.session);
    // console.log(req.sessionID)
    if (!req.session.viewsCount) {
        req.session.viewsCount = 1;
        console.log("Welcome to this page for the first time!");
    } else {
        req.session.viewsCount += 1;
        console.log("You visited this page " + req.session.viewsCount + " times");
    }
    res.render("", { title: 'main page' });
}
exports.allUser = (req, res) => {
    User.find((err, data) => {
        if (err) throw err
        else res.render("displayAllUsers", { users: data });
    })
}
exports.deleteProduct = (req, res) => {
    msg = (req.query.msg) ? req.query.msg : ''
    console.log(msg);
    res.render("deleteProduct", { title: 'Delete data', newItem, msg });
}
exports.productAjax = (req, res) => {
    Product.find((err, data) => {
        if (err) console.log(err)
        else {
            // console.log('products',data)
            res.json(data)
        }
    })
}
exports.userAjax = (req, res) => {
    User.find((err, data) => {
        if (err) console.log(err)
        else {
            // console.log('users',data)
            res.send(data)
        }
    })
}
exports.adminProduct = (req, res) => {
    Product.find((err, data) => {
        if (err) console.log(err)
        else {
            res.render("admin-overview", { product: data, title: 'admin product page' });
        }
    })
}
exports.adminUser = (req, res) => {
    User.find((err, data) => {
        if (err) console.log(err)
        else {
            // console.log(data);
            res.render("admin-overview", { user: data, title: 'admin user page' });
        }
    })
}
exports.product = (req, res) => {
    Product.find({}, (err, data) => {
        if (err) console.log(err)
        else {
            // console.log(data);
            res.render("product", { product: data, title: 'product page' })
        }
    });
}
exports.deleteId = (req, res) => {
    Product.find({ _id: req.params.id }, (err, data) => {
        console.log(data)
        if (err) console.log('error from server' + err)
        else { //res.send('data is '+ data)
            newItem = data[0]
            res.redirect("/delete-product");
        }
    })
}
exports.masterProduct = (req, res) => {
    newItem = req.body;
    console.log(req.body);
    let newProduct = new Product(req.body)
    newProduct.save((err) => {
        if (err) console.log(err)
        else { console.log('Data is saved......') }
    });
    res.redirect("/product")
}
exports.deleteUser = (req, res) => {
    let id = req.params.id;
    User.deleteOne({ _id: id }, (err, data) => {
        console.log(req.params.id)
        if (err) console.log('error from server' + err)
        else { //res.send('data is '+ data)
            console.log(data)
            res.redirect("/admin-overview");
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
        res.render('userInfo', { userData, msg, userId });
    })
}
exports.updateUserPost = (req, res) => {
    userId = req.params.id;
    console.log(userId, req.body)
    User.findOneAndUpdate({ _id: userId }, req.body, (err, doc) => {
        if (err) throw err;
        userData = doc;
        //console.log('data updated', "userData :" + userData);
        msg = 'One user has been updated!';
        res.redirect(
            url.format({
                pathname: '/userInfo',
                query: { userData, msg }
            }));
    })
}
exports.deleteProductPost = (req, res) => {
    newItem = req.body;
    let id = req.params.id;
    console.log(id)
    console.log(req.params.id)
    Product.deleteOne({ id: req.params.id }, (err, result) => {
        if (err) console.log(err);
        msg = 'One Product has been Deleted!';
        res.redirect(url.format({
            pathname: '/delete-product',
            query: { msg }
        }));
        console.log("Product Removed")
    })
}
exports.updateProductGet = (req, res) => {
    Product.find({ _id: req.params.id }, (err, data) => {
        if (err) console.log('error from server' + err)
        else { //res.send('data is '+ data)
            newItem = data[0]
            res.redirect("/update-product");
        }
    })
}
exports.updateProductPost = (req, res) => {
    //console.log('update post')
    newItem = req.body;
    console.log('input data', req.body)
    let id2 = req.body.id;
    // console.log(id2)
    Product.findOneAndUpdate({ id: id2 }, req.body, { new: true }, (err, data) => {
        if (err) throw err
        else {
            //console.log('data updated', "Result :" + data);
            msg = 'One Product has been Updated!';
            res.redirect(
                url.format({
                    pathname: '/update-product',
                    query: { msg }
                }));
        }
    })
}
exports.signup = (req, res) => {
    //console.log(req.body);
    const file = req.file;
    console.log('*save file info*')
    console.log(file)
    //console.log(req.body);
    let userInfo = req.body;
    let userObject = {
        imagePath: 'uploads/' + file.filename,
        ...userInfo
    }
    //console.log(userObject)
    let newUser = new User(userObject);
    newUser.save(() => { console.log('Data is saved in DB') })
    res.render("Login", { title: 'login-page' });
}
exports.pointOfSale = (req, res) => {
    const sellingProductId = req.body.sellingProductId
    var sellingProductName;
    let sellingProductQuantity = req.body.sellingProductQuantity
    Product.find({ id: sellingProductId }, (err, data) => {
        if (err) console.log(err)
        else {
            totalPrice = sellingProductQuantity * data[0].retailPrice;
            // console.log(totalPrice)
            sellingProductName = data[0].proName
            // console.log(sellingProductName)
            amount = amount + totalPrice
            var itemDetail = {
                sellingItemId: data[0].id,
                sellingItemName: data[0].proName,
                sellingItemPrice: data[0].retailPrice,
                sellingItemQuantity: sellingProductQuantity,
                sellingItemTotalPrice: totalPrice,
                totalAmount: amount
            }
            console.log("item added")
            sellingItem.push(itemDetail)
            res.redirect("/pointOfSale")
            console.log("item added ****")
        }
    });
}
exports.verifiyEmail = (req, res) => {
    let hexNum = req.query.token;
    Email.findOne({ authToken: hexNum }, (err, doc) => {
        if (err) { return console.error(err); }
        doc.isAuthenticated = true;
        var userEmail = doc.email;
        console.log('userEmail', userEmail)
        doc.save(function (err) {
            if (err) return console.error(err);
            console.log('succesfully updated users email');
            sendEmail(
                userEmail,
                'asreen.ilyas66@gmail.com',// verified
                'Email confirmed!',
                replay(doc.name)
            );
        });
    });
    res.render('verifyEmail', { title: 'Authenticating...' });
}
exports.mailContact = (req, res) => {
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
        authToken: authToken,
        isAuthenticated: false
    });
    authenticationURL = 'http://localhost:5000/verify_email?token=' + newEmail.authToken;
    newEmail.save(function (err, newEmail) {
        if (err) {
            return console.error(err);
        }
        console.log('new contact user', newEmail);
    });
    console.log('authenticationURL', authenticationURL)
    sendEmail(to = 'asreen.ilyas66@gmail.com',//newEmail.email
        from = 'asreen.ilyas66@gmail.com',
        subject = 'Confirm your email',
        html = output(name, email, message, authenticationURL)
    );
    let msgEmail = false;
    req.flash('msg', 'Thank you for your message. We will send you Email. Check you Email please !!')
    res.redirect('contact')
    msgEmail = false;
}
exports.checkUser = (req, res) => {
    let role;
    console.log('req.body', req.body);
    let userFound = false;
    User.find((err, data) => {
        //console.log('check user query',data)
        if (err) console.log(err)
        data.map((item) => {
            if (item.email == req.body.email && item.pswd == req.body.pswd) {
                userFound = true;
                //console.log('item', item);
                req.session.userLogin = item;
                console.log('req.session', req.session)
                req.session.save();
                role = req.session.userLogin.role;
                console.log('role from session', role);
            }
        });
        if (userFound) {
            //console.log('userFound', userFound);
            if (role == "user") res.redirect('/product')
            else if (role == "admin") res.redirect('/admin-overview')
            else if (role == "worker") res.redirect('/pointOfSale')
        }
        else {
            console.log('userFound', userFound);
            msg = "Email or password is invalid ";
            res.render('login', { title: 'login-page', msg })
        }
    })

}