export class ProductsModel {
    constructor(
        private id: string,
        name: string,
        price: number,
        qty_stock: number
    ){}
    static setProducts(data: any): ProductsModel{
        return new ProductsModel(
            data.id,
            data.name,
            data.price,
            data.qty_stock
        )
    }
}