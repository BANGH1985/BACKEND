import { Router } from 'express';
import ProductManager from '../controllers/productManager.js'
import { __dirname } from "../utils.js"

const pm=new ProductManager(__dirname+'/data/products.json')
const routerV = Router()


routerV.get("/",async(req,res)=>{
    const listadeproductos=await pm.getProductsView()
    res.render("home",{listadeproductos})
})

routerV.get("/realtimeproducts",(req,res)=>{
res.render("realtimeproducts")
})





export default routerV