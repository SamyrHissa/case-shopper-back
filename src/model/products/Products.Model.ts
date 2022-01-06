export class ProductsModel {
    constructor(
        private id: string,
        private name: string,
        private price: number,
        private qty_stock: number
    ){}
    getId = () => this.id
    getName = () => this.name
    getPrice = () => this.price
    getQty_stock = () => this.qty_stock
    static setProducts(data: any): ProductsModel{
        return new ProductsModel(
            data.id,
            data.name,
            data.price,
            data.qty_stock
        )
    }
}