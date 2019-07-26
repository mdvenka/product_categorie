const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {db} = require('../models/db');
const {productdb} = require('../models/db')
// use bodyparser
app.use(bodyParser.urlencoded({
    extended: true
}));

// use bodyparser
app.use(bodyParser.json());


// listen to the ports
app.listen(4000,()=>{
    console.log("we are listing to the port 4000")
})

// test url
app.get('/',(req,res)=>{
    res.send("hello john")
})

// now post urladdcategoriel
app.post('/addcategoriel',(req,res)=>{
  if(!req.body) {
       return res.status(400).send({
           message: "Note content can not be empty"
       })
     }
  const categoriel = new db({
        category : req.body.category,
        Products : req.body.Products,
        description:req.body.description,

    })
   categoriel.save().then((data)=>{
      res.send(data);
  })
})

// get products of the category
app.get('/category/:id',(req,res)=>{
  console.log("we are in get category api")
  db.find().then(data=>res.send(data))
})


// add products in the category
app.post('/addproduct/:id',(req,res)=>{
  console.log("we are pushing the data into the categarial");
  const categoryitems = db.findById(req.params.id);
  const  products  = new productdb({
    product :req.body.product
    })
    console.log(categoryitems);

    products.save().then((productdata)=>{
      console.log(productdata._id);
      categoryitems.Products.push(productdata._id)
    })
  })


// update the category
// findByIdAndUpdate,findByIdAndRemove
app.put('/updatecategorie',()=>{

})


// update the product
// /findByIdAndUpdate
app.put('/updateproduct',()=>{

})

// delete  the category
// findByIdAndRemove
app.delete('deletecategory/:id',()=>{

})



// delte the the product
// app.delte('deleteproduct/:id',()=>{






































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
