const express= require('express');
const app = express()
const path = require('path')
const methodOverride = require('method-override')
const Product = require('./models/product');
const { doesNotMatch } = require('assert');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'))

const categories = ['fruit', 'vegetable', 'dairy']

app.get('/products', async (req, res) =>{
    const {category} = req.query;
    if(category){
        const products = await Product.find({category : category})
        res.render('product/index', {products})
    }
    else{
        const products = await Product.find({})
        res.render('product/index', {products})
    }
})
app.get('/product/:id', async (req, res) =>{
    const {id} = req.params;
    const product = await Product.findById(id)
    res.render('product/show',{product})
})
app.get('/products/new', (req, res) =>{
    res.render('product/new', {categories})
})

app.post('/allproducts', async(req, res) =>{
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/product/${newProduct._id}`)
})

app.get('/product/:id/edit', async (req, res) =>{
    const {id} = req.params;
    const product = await Product.findById(id)
    res.render('product/edit',{product, categories})
})

app.delete('/product/:id', async (req, res) =>{
    const {id} = req.params;
    const deletedProducy = await Product.findByIdAndDelete(id)
    res.redirect('/products')
})

app.put('/product/:id', async(req, res) =>{
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators : true, new : true});
    res.redirect(`/product/${product._id}`)
})

app.listen(3000, () =>{
    console.log("LISTENING!!!");
})