const mongoose = require('mongoose');
// connect to local mongo
mongoose.connect('mongodb://localhost:27017/products',{
    useNewUrlParser: true
}).then(()=>{
    console.log("we are connecting to the db")
})

// create a categoriel27017

var Category  =  mongoose.Schema({
    category:String,
    Products:[],
    description:String,
})

// create a product array

var Products = mongoose.Schema({
    product : String,
    require:false
})

// module export

module.exports = {
db:  mongoose.model('category',Category),
productdb: mongoose.model('product',Products)
};
