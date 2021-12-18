import { OrdersModel } from "../../model/orders/Orders.Model";

export default interface OrdersRepository {
    create(input: OrdersModel): Promise<boolean>
    getOrders(): Promise<OrdersModel[]>
    getOrderById(order_id: string): Promise<OrdersModel | boolean>
}