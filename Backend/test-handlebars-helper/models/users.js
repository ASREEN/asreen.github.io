const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const userSchema=new Schema({
    id:Number,
    name:String,
    username:String,
    email:String,
    address:Schema.Types.Mixed,
    phone:String,
    website:String,
    company:Schema.Types.Mixed
});
 module.exports=userSchema;