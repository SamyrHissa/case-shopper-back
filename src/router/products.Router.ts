import express from "express"
import { ProductsController } from "../controller/products/Products.Controller"

export const productsRouter = express.Router()

const productsController = new ProductsController()

productsRouter.get("/", productsController.getProducts)