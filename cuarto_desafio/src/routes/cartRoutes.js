import express from 'express';
import CartManager from '../cartManager.mjs'

const router = express.Router();
const cartManager = new CartManager("./cuarto_desafio/src/data/carts.json")

router.get('/', async (req, res) => {
    try {
        const carts = await cartManager.getCarts()
        res.json(carts)
    } catch (error) {
        console.error('Error al obtener los carritos:', error)
        res.status(500).json({ message: 'Error interno del servidor' })
    }
});

router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart()
        res.status(201).json(newCart)
    } catch (error) {
        console.error('Error al crear el carrito:', error)
        res.status(500).json({ message: 'Error interno del servidor' })
    }
})

router.get('/:cartId/products', async (req, res) => {
    const cartId = parseInt(req.params.cartId)
    try {
        const products = await cartManager.getCartProducts(cartId)
        res.json(products)
    } catch (error) {
        console.error('Error al obtener los productos del carrito:', error)
        res.status(500).json({ message: 'Error interno del servidor' })
    }
})

router.post('/:cartId/products/:productId', async (req, res) => {
    const cartId = parseInt(req.params.cartId)
    const productId = parseInt(req.params.productId)
    try {
        await cartManager.addProductToCart(cartId, productId)
        res.status(201).json({ message: 'Producto agregado al carrito' })
    } catch (error) {
        console.error('Error al agregar el producto al carrito:', error)
        res.status(500).json({ message: 'Error interno del servidor' })
    }
});

export default router
