export class ItensOrderModel{
    constructor(
        private id: string,
        private order_id: string,
        private product_id: string,
        private qty_requested: number,
        private price: number
    ){}

    getId = () => this.id
    getOrderId = () => this.order_id
    getProductId = () => this.product_id
    getQty_requested = () => this.qty_requested
    getPrice = () => this.price
    
    static setItensOrder(data:any): ItensOrderModel{
        return new ItensOrderModel(
            data.id,
            data.order_id,
            data.product_id,
            data.qty_requested,
            data.Price
        )
    }
}