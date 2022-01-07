const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const shortid = require("shortid")

// we run express as a function and set the result inside app variable
const app = express()

// use bodyParser
app.use(bodyParser.urlencoded({extended:true}))

// initialize mongoose database with two parameters
// 1. first parameter is for the mongodb connection
// 2. second parameter is for better connection
mongoose.connect("mongodb://localhost/react-shopping-cart-db",{
    // we use the following lines of code for better connection
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
})

// create a mongoose model with a collection name and list of columns for the collection

const Product = mongoose.model(
    "products",
    new mongoose.Schema({
        _id: {type: String, default: shortid.generate},
        title: String,
        description: String,
        image: String,
        price: Number,
        availableSizes: [String],
    })

)


// define the first end point
app.get("/api/products",async(req, res) =>{
    const products = await Product.find({})
    res.send(products)

})

// to create a product, we use the http post method for that

app.post("/api/products", async (req,res) =>{
    const newProduct = new Product(req.body)
    const savedProduct = await newProduct.save()
    res.send(savedProduct)
})

// define the api to delete the product
app.delete("/api/products/:id", async (req,res)=>{
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)
    res.send(deletedProduct)
})

// we create a port  to lunch the express server
const port = process.env.PORT || 5000
app.listen(port, ()=> console.log("server at http://localhost:5000"))
