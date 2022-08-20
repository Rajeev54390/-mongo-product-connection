const mongoose=require('mongoose')
const db = require('../configuration/db')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    price :{
        type : Number,
        required: true,
        min: 0
    },
    category :{
        type: String,
        lowercase :true,
        enum :['fruit', 'vegetable', 'dairy']
    }
})

const Product = mongoose.model('product',productSchema);

module.exports = Product