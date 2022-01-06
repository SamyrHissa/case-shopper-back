import { ProductsModel } from "../../model/products/Products.Model";

export default interface ProductsRepository {
    getProducts(): Promise<ProductsModel[]>
    getProductById(product_id: string): Promise<ProductsModel | undefined>
}