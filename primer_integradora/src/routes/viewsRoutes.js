import { Router } from 'express'
import ProductManager from '../../src/Dao/mongomanagers/productManagerMongo.js'
import { __dirname } from "../utils.js"

const manager = new ProductManager()
const router = Router()


router.get("/",async(req,res)=>{
    const listadeproductos=await manager.getProducts()
    res.render("home",{listadeproductos})
})

router.get("/realtimeproducts",(req,res)=>{
    res.render("realtimeproducts")
})

router.get("/chat",(req,res)=>{
    res.render("chat")
})

export default router