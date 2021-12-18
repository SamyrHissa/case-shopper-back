import { Request, Response } from "express";
import { ProductsBusiness } from "../../business/products/Products.Business";
import { ProductsData } from "../../data/products/Products.Data";

export class ProductsController {
    private productsBusiness: ProductsBusiness

    constructor(){
        this.productsBusiness = new ProductsBusiness(
            new ProductsData()
        )
    }
    getProducts = async (req: Request, res: Response) => {
        try {
            const result = await this.productsBusiness.getProducts()
            res.status(200).send(result)
        } catch (error: any) {
            res.status(error.code).send({ message: error.message });
        }
    }
}