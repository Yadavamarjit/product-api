const AWS = require('aws-sdk')
const data =require('./data.json')
const config =  require('./config/index')

// unpacking variables from config
const {db:{Id,SECRET,REGION}}=config

// Aws congfiguration
AWS.config.update({
    region:REGION,
    accessKeyId:Id,
    secretAccessKey:SECRET
})


const dynamoClient = new AWS.DynamoDB.DocumentClient()

// declaring assigning table name in varable Table_Name
const Table_Name = 'image-api'

// function for providing all products
const getProducts =async ()=>{
    const params ={
        TableName:Table_Name
    }
    const product =await dynamoClient.scan(params).promise()
    console.log(product)
    return product
}

// function for adding product

const addProduct = async (products)=>{
    const params = {
        TableName:Table_Name,
        Item:products
    }
    return await dynamoClient.put(params).promise()
}

// function for getting single product
const getProductbyId = async (id)=>{
    const params = {
        TableName:Table_Name,
        Key:{
            id
        }
    }
    return await dynamoClient.get(params).promise()
}

// function for deleting product
const deleteProductbyId = async (id)=>{
    const params = {
        TableName:Table_Name,
        Key:{
            id
        }
    }
    return await dynamoClient.delete(params).promise()
}

module.exports = {
    dynamoClient,
    getProducts,
    getProductbyId,
    deleteProductbyId,
    addProduct
}

