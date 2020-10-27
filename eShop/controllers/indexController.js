const Product=require('../models/Product')
exports.allProducts=(req, res)=> {
    Product.find((err, data)=> {
        if(err) throw err.message;
        // console.log('data',data)
        res.render('index', {
            msg: req.flash('msg'),
            data
        });
    })
}
// filter using where gte lte
exports.filter=(req,res)=>{
    console.log('req.body',req.body)
    let reqPrice=req.body.priceInfo;
    let reqName=req.body.nameInfo
    Product.find((err, data)=> {
        if(err) throw err.message;
       console.log('data',data)
        res.render('index', {
            msg: req.flash('msg'),
            data
        });
    }).where({product_name:reqName}).where(`price`).gte(`${reqPrice}`).lte('1500').limit(10)
}
// create new item
exports.createItem=(req, res)=> {
    console.log(req.body);
    let newProduct = new Product(req.body);
    newProduct.save(err=>{
        if(err) { 
            console.log(err.message)
        }
        req.flash('msg', 'New product has been added in database!')
        res.redirect('/');
    })
}
// delete item
exports.deleteItem=(req,res)=>{
    let id=req.params.id;
    Product.findByIdAndRemove(id,err=>{
        if (err) throw err;
        req.flash('msg','Item has been deledted')
        res.redirect('/')
    })
} 
