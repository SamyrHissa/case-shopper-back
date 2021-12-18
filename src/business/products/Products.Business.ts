import { ProductsData } from "../../data/products/Products.Data";
import BaseError from "../../error/BaseError";
import { ProductsModel } from "../../model/products/Products.Model";

export class ProductsBusiness {
    
    constructor(
        private data: ProductsData
    ){}
   getProducts = async (): Promise<ProductsModel[]> => {
       const result = await this.data.getProducts();
       if(result){
           return result
        } else {
            throw new BaseError("Produto não encontrado!", 404)
        }
       
   }
}