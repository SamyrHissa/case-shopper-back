import { ProductsModel } from "../../model/products/Products.Model";
import { BaseDatabase } from "../BaseDatabase";
import ProductsRepository from "./Products.Repository";

export class ProductsData extends BaseDatabase implements ProductsRepository{
    constructor(){
        super("shopper_Products")
    }
    async getProducts(): Promise<ProductsModel[]>{
        try {
            const result = await this.getConnection()
                            .select("*")
                            .from(this.tableName)
            
            return result
        } catch (error: any) {
            console.log(error);
            return []
        }
    }
    async getProductById(product_id: string): Promise<ProductsModel | boolean>{
        try {
            const result = await this.getConnection()
                            .select("*")
                            .from(this.tableName)
                            .where({
                                "id": product_id
                            })
            
            return result[0]
        } catch (error: any) {
            console.log(error);
            return false
        }
    }
}