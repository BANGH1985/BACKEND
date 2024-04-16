const express = require('express')
const ProductManager = require('./productManager.js')
const app = express()
const PORT =  8080

const manager = new ProductManager("./products.json")

app.get('/products', (req, res) => {
    try {
        const allProducts = manager.getProducts()
        res.json(allProducts)
    } catch (error) {
        console.error("Error not Product found",error)
        res.status(500).json({message: "Product not found"})
    }
})
app.get('/products/:pid', (req, res) => {  
    const productId = parseInt(req.params.pid)
    const product = manager.getProductById(productId)
    if (product) {
        res.json({product})
    }else{  
        res.status(404).json({message: 'Product not found'})
    }
    
})

app.listen(PORT, () => {    
    console.log(`Server is running on port ${PORT}`)
})