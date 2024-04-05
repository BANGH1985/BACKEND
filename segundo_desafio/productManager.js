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
        } catch (err) {
            // Si el archivo no existe o hay un error al leerlo, se inicia con un array vacío
            this.products = []
        }
    }

    saveProducts() {
        const data = JSON.stringify(this.products, null, 2)
        fsPromises.writeFile(this.path, data)
            .catch(error => console.error('Error al guardar los productos:', error))
    }

    getProducts() {
        return this.products
    }

    addProduct(newProduct) {
        if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.thumbnail || !newProduct.code || !newProduct.stock) {
            console.log("Todos los campos son obligatorios")
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
    }

    getProductById(product_id) {
        const searchProduct = this.products.find(product => product.id === product_id)
        if (!searchProduct) {
            console.error("Producto no encontrado")
            return null
        }
        return searchProduct
    }

    updateProduct(productId, updatedFields) {
        const index = this.products.findIndex(product => product.id === productId)
        if (index === -1) {
            console.error("Producto no encontrado")
            return
        }
        this.products[index] = { ...this.products[index], ...updatedFields }
        this.saveProducts()
        console.log("Producto actualizado correctamente")
    }

    deleteProduct(productId) {
        const index = this.products.findIndex(product => product.id === productId)
        if (index === -1) {
            console.error("Producto no encontrado")
            return
        }
        this.products.splice(index, 1)
        this.saveProducts()
        console.log("Producto eliminado correctamente")
    }
}

const filePath = 'products.json'
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
    });

    // Actualizar un producto
    const productIdToUpdate = 1
    const updatedFields = {
        title: 'Camisa actualizada',
        description: 'Camisa manga larga y corta'
    }
    manager.updateProduct(productIdToUpdate, updatedFields)

    // Eliminar un producto
    const productIdToDelete = 2
    manager.deleteProduct(productIdToDelete)

    // Obtener un producto por ID
    const productIdToGet = 3
    const product = manager.getProductById(productIdToGet)
    console.log("Producto encontrado:", product)

    // Obtener todos los productos
    const allProducts = manager.getProducts()
    console.log("Lista de productos:", allProducts)
} catch (error) {
    console.error(error.message)
}