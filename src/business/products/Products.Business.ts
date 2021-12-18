import { ProductsData } from "../../data/products/Products.Data";
import { ProductsModel } from "../../model/products/Products.Model";

export class ProductsBusiness {
    
    constructor(
        private data: ProductsData
    ){}
   getProducts = async (): Promise<ProductsModel[]> => {
       return await this.data.getProducts()
   }
}