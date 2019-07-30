const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { db } = require('../models/db');
const { productdb } = require('../models/db');
const mongoose = require('mongoose');
const response = require('connect')
var cors = require('cors')

app.use(cors());
// use bodyparser
app.use(bodyParser.urlencoded({
  extended: true
}));

// use bodyparser
app.use(bodyParser.json());


// listen to the ports
app.listen(4000, () => {
  console.log("we are listing to the port 4000")
})

// test url
app.get('/', (req, res) => {
  res.send("hello john")
})


// now post urladdcategoriel
app.post('/addcategoriel', (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Note content can not be empty"
    })
  }
  const categoriel = new db({
    category: req.body.category,
    Products: req.body.Products,
    description: req.body.description,

  })
  categoriel.save().then((data) => {
    res.send(data);
  })
})

// we have to get all categories 

app.get('/getcategorielproducts', (req, res) => {

  console.log("we are getting all the products with categorial");
  db.find().then(data => res.send(data))
  // data[{'Products':Products}]
})




// add products in the category
app.post('/addproduct/:id', (req, res) => {
  // we are getting the  id 
  const id = req.params.id;
  // console.log(db.category)
  console.log(`we are getting the id ${id}`)
  const categoryitems = db.findById(req.params.id).then((data) => {
    console.log(`we  are printing the data ${data}`)
    const products = new productdb({
      product: req.body.product
    })
    products.save().then((productdata) => {
      console.log(productdata)
      console.log(data)
      data.Products.push(productdata._id)
      data.save()
      res.send(data)
    })
  })
})


// get products of the category     
app.get('/category/:id', async (req, res) => {
  console.log("we are in get category api")
  // response.setHeader("Content-Type", "text/html");
  console.log(req.params.id);
  const categoriy = await db.findById(req.params.id)

  // res.send(categoriy)
  const products = await productdb.find({ _id: { $in: categoriy.Products } })
   res.send(products)
})





// update the category
// findByIdAndUpdate,findByIdAndRemove
app.put('/updatecategorie/:id', async (req, res) => {

  try {
    console.log("we are updating the categorie");
    mongoose.set('useFindAndModify', false);
    console.log(req.params.id);
    await db.findOneAndUpdate({ _id: req.params.id }, { $set: { category: req.body.category } })
    res.send()

  } catch (err) {
    res.send({ error: err.message })
  }



})

// update product 
app.put('/updateproduct/:id', async (req, res) => {
  try {
    console.log("we are updating the product");
    mongoose.set('useFindAndModify', false);
    await productdb.findOneAndUpdate({ _id: req.params.id }, { $set: { product: req.body.product } })
    const categoriy = await db.findById(req.params.id)
    res.send(categoriy)
  } catch (err) {
    res.send({ error: err.message })
  }

})



// Delete Category 
app.delete('/deletecategory/:id', async (req, res) => {
  console.log('we are deleting')
  try {
    console.log("we are deleting the category");
    await db.findOneAndDelete({ _id: req.params.id })
    await res.send('Deleted Succesfully')
  }
  catch (err) {
    res.send(err.msg)
  }
})



// Delete Product 
app.delete('/deleteproduct/:cid:pid', async (req, res) => {
  try {
    console.log("we are deleting the product");
    await productdb.findOneAndDelete({ _id: req.params.pid })
    await db.findOneAndUpdate({ _id: req.params.cid }, { $pull: { category: req.params.pid } })

  }
  catch (err) {
    res.send({ err: err.msg })
  }
})

// [
//   {
//       "Products": [
//           "5d3ea0672e1e8c1d6ff73144",
//           "5d3ea21c37e5261e27858898",
//           "5d3ea22837e5261e27858899"
//       ],
//       "_id": "5d3afb903386a760498d335b",
//       "category": "test",
//       "description": "great product must buy",
//       "__v": 3
//   },
//   {
//       "Products": [],
//       "_id": "5d3feb2ffa4aa8160a332d91",
//       "category": "electronics",
//       "description": "must buy",
//       "__v": 0
//   },
//   {
//       "Products": [],
//       "_id": "5d3feb3ffa4aa8160a332d92",
//       "category": "meat",
//       "description": "must buy",
//       "__v": 0
//   },
//   {
//       "Products": [],
//       "_id": "5d3feb4dfa4aa8160a332d93",
//       "category": "clothing",
//       "description": "must buy",
//       "__v": 0
//   }
// ]

// await parentdata.Products.remove( { _id: req.params.id } )
// console.log("we are printing product array")
// console.log(products_array);
// products_array.filter(products_array => products_array!==req.params.id ) 


// delte the the product
// app.delte('deleteproduct/:id',()=>{

//delete the product id 
// await db.findByIdAndDelete({_id:req.params.id})
// const parentdata =  await db.find();
// console.log(parentdata);
// console.log('////////////////')
// console.log(parentdata[0]);
// console.log(parentdata[0].Products)



















mongoose.Types.String









  // console.log(`we are printing the id ${req.params.id}`)
  // console.log(categoryitems);
  // const  products  = new productdb({
  //   product :req.body.product
  //   })
  //   console.log(categoryitems);

  //   products.save().then((productdata)=>{
  //     console.log(productdata._id);
  //     categoryitems.Products.push(productdata._id)
  //   })
  // })
// get all the categorielproducts
// app.get('/g',(req,res)=>{
//     db.find().then((categoriel)=>{
//       res.send(categoriel)
//     })
//
// })

// add product by id in categorieal
 // app.post('/addproduct/:id',(req,res)=>{
 //     const product = new db({
 //       product : req.body.product
 //    })
 //    product.save().then((data)=>{
 //        console.log(req.params.id)
 //        var category =  db.findById(req.params.id);
 //        // console.log('-----------------------')
 //        // console.log(collection);
 //        const id = product._id;
 //        console.log(id);
 //        console.log(category);
 //        category.Products.push(id)
 //        // console.log(data)
 //        res.send(data)
 //    })
 //
 // })

//  get all products inside the categoriel
// app.get('/getproducts/:id',(req,res)=>{
// db.findById(req.params.id).then((data)=>{
//     res.send(data)
// })
// })


// insert with id
// id = req.params.id;
// insert the id
// db.product.insert({
//     "id":  id,
//     "product" : product,
// })
//
