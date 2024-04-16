const express = require('express')
const ProductManager = require('./productManager.js')
const app = express()
const PORT =  8080

const productManager = new ProductManager()

app.get('/products', (req, res) => {    
    const allProducts = productManager.getProducts()
    res.json({allProducts})
})
app.get('/products/:pid', (req, res) => {  
    const productId = parseInt(req.params.pid)
    const product = ProductManager.getProductById(productId)
    if (product) {
        res.json({product})
    }else{  
        res.status(404).json({message: 'Product not found'})
    }
    
})

app.listen(PORT, () => {    
    console.log(`Server is running on port ${PORT}`)
})