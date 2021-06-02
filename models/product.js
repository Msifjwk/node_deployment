/*jshint esversion: 6 */ 

const mongoose   = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = Schema({
    name    : String,
    picture : String,
    price   : {type:Number,default:0},
    description : String,
    category    : {type:String, enum:['computers','phones','accesories']}

});

module.exports = mongoose.model('Product', ProductSchema);