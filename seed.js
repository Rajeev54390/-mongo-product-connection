const db = require('./configuration/db')
const product = require('./models/product')

// const p = new product({name : 'potato', price : 20, category : 'vegetable'})
// p.save().then(p =>{
//     console.log(p)
// })

const things =[
    {
        name :'Tomato',
        price : 80,
        category :'vegetable'
    },
    {
        name :'Paneer',
        price : 400,
        category :'dairy'
    },
    {
        name :'Milk',
        price : 30,
        category :'dairy'
    },
    {
        name :'Apple',
        price : 120,
        category :'fruit'
    },
]

product.insertMany(things).then(res =>{
    console.log(res)
})