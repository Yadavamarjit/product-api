const express =require("express")
const app = express();
const cors =require('cors')
const {getProducts} =require('./dynamo')
const config = require('./config/index')
const port = config.app.port

app.use(cors())
app.get('/',(req,res)=>{
    res.send("visit to /products to get product data")
})

app.get('/products',async(req,res)=>{
    try{
        const product =await getProducts()
        res.json(product)
    }
    catch (error){
        console.log(err)
        res.status(500).json({err:"Something went wrong"})
    }
})

app.listen(port,()=>{
    console.log("Listening on port",port)
})