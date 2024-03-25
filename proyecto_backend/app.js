class ProductManager {  
    constructor (){ 
        this.products = []
    }
    getProduct(){   
        return this.products
    }
    addProduct(title, description, price, thumbnail, code, stock = 1000){   
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son obligatorios")
        }
        if (this.products.some(product => product.code === code)) {
            console.log("El código del producto ya existe")
            return
        }
        const product_id = this.products.length + 1
        const product = {    
            id: product_id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        this.products.push(product)
        console.log("Producto agregado correctamente")
    }
    getProductById (product_id){    
        const searchProduct = this.products.find((product)=> product.id === product_id)
        if (!searchProduct) {
            console.log("Not Found")
            return null
        } else {
            return searchProduct
        }
    }
}

const manager = new ProductManager()
try {
    manager.addProduct('Camisa', 'Camisa manga larga', 25.99, 'camisa.jpg', 'PRD001')
    manager.addProduct('Pantalon', 'Pantalón de vestir', 34.99, 'pantalon.jpg', 'PRD002')
    manager.addProduct('Camisa', 'Camisa manga corta', 19.99, 'camisa2.jpg', 'PRD001') /// agrego un producto con un codigo igual y salta el error y no lo agrega.
} catch (error) {
    console.error(error.message)
}
console.log("Lista de productos:")
console.log(manager.getProduct())