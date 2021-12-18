export class OrdersModel {
    constructor(
        private id: string,
        private name_client: string,
        private delivery_date: string
    ){}
    getId = () => this.id
    getnameClient = () => this.name_client
    getDeliveryDate = () => this.delivery_date
    static setOrders(data:any): OrdersModel{
        return new OrdersModel(
            data.id,
            data.name_client,
            data.delivery_date
        )
    }
}