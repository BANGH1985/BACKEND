const fs = require('fs')
const { promises: fsPromises } = require('fs')

class ProductManager {
    constructor(filePath) {
        this.path = filePath
        this.loadProducts()
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8')
            this.products = JSON.parse(data)
        } catch (error) {
            this.products = []
        }
    }

    async saveProducts() {
        const data = JSON.stringify(this.products, null, 2)
        try {
            await fsPromises.writeFile(this.path, data) 
        } catch (error) {
            console.error('Error al guardar los productos:', error)
        }
    }

    getProducts() {
        return this.products
    }

    addProduct(newProduct) {
        if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.thumbnail || !newProduct.code || !newProduct.stock) {
            return
        }
        if (this.products.some(product => product.code === newProduct.code)) {
            return
        }
        const product_id = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1
        const product = {
            id: product_id,
            title: newProduct.title,
            description: newProduct.description,
            price: newProduct.price,
            thumbnail: newProduct.thumbnail,
            code: newProduct.code,
            stock: newProduct.stock
        }
        this.products.push(product)
        this.saveProducts() // Guarda los productos después de agregar uno nuevo
        console.log("Product saved")
    }

    getProductById(product_id) {
        const searchProduct = this.products.find(product => product.id === product_id)
        if (!searchProduct) {
            return null
        }
        return searchProduct
    }

    updateProduct(productId, updatedFields) {
        const index = this.products.findIndex(product => product.id === productId)
        if (index === -1) {
            return
        }
        const updateProduct = { ...this.products[index], ...updatedFields}
        delete updateProduct.id
        if (updateProduct.code && this.products.some(product => product.code === updateProduct.code && product.id !== productId)) {
            console.error("Error el codigo proporcionado ya existe")
            return
        }
        this.products[index] = updateProduct
        this.saveProducts()
    }

    deleteProduct(productId) {
        const index = this.products.findIndex(product => product.id === productId)
        if (index === -1) {
            return
        }
        this.products.splice(index, 1)
        this.saveProducts()
    }
}

const filePath = "./products.json"
const manager = new ProductManager(filePath)

try {
    // Agregar varios productos
    manager.addProduct({
        title: 'Camisa',
        description: 'Camisa manga larga',
        price: 25.99,
        thumbnail: 'camisa.jpg',
        code: 'PRD001',
        stock: 100
    })
    manager.addProduct({
        title: 'Pantalón',
        description: 'Pantalón de vestir',
        price: 34.99,
        thumbnail: 'pantalon.jpg',
        code: 'PRD002',
        stock: 50
    })
    manager.addProduct({
        title: 'Zapatos',
        description: 'Zapatos de cuero',
        price: 49.99,
        thumbnail: 'zapatos.jpg',
        code: 'PRD003',
        stock: 80
    })
    manager.addProduct({
        title: 'Sombrero',
        description: 'Sombrero de verano',
        price: 15.99,
        thumbnail: 'sombrero.jpg',
        code: 'PRD004',
        stock: 30
    })
    manager.addProduct({
        title: 'Bufanda',
        description: 'Bufanda de lana',
        price: 12.50,
        thumbnail: 'bufanda.jpg',
        code: 'PRD005',
        stock: 60
    })
    manager.addProduct({
        title: 'Gorra',
        description: 'Gorra deportiva',
        price: 18.75,
        thumbnail: 'gorra.jpg',
        code: 'PRD006',
        stock: 45
    })
    manager.addProduct({
        title: 'Gafas de sol',
        description: 'Gafas de sol polarizadas',
        price: 29.99,
        thumbnail: 'gafas.jpg',
        code: 'PRD007',
        stock: 20
    })
    manager.addProduct({
        title: 'Bolso',
        description: 'Bolso de cuero sintético',
        price: 39.99,
        thumbnail: 'bolso.jpg',
        code: 'PRD008',
        stock: 55
    })
    manager.addProduct({
        title: 'Reloj',
        description: 'Reloj de pulsera',
        price: 99.99,
        thumbnail: 'reloj.jpg',
        code: 'PRD009',
        stock: 10
    })
    manager.addProduct({
        title: 'Calcetines',
        description: 'Calcetines deportivos',
        price: 8.25,
        thumbnail: 'calcetines.jpg',
        code: 'PRD010',
        stock: 70
    })

    /* // // Actualizar un producto
    const productIdToUpdate = 1
    const updatedFields = {
        title: 'Camisa actualizada',
        description: 'Camisa manga larga y corta'
    }
    manager.updateProduct(productIdToUpdate, updatedFields)

    // // Eliminar un producto
    const productIdToDelete = 2
    manager.deleteProduct(productIdToDelete) */

    //Obtener un producto por ID
    const productIdToGet = 3
    manager.getProductById(productIdToGet)

    //Obtener todos los productos
    manager.getProducts()
} catch (error) {
    console.error(error.message)
}

module.exports = ProductManager