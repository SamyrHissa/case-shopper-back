import { ItensOrderModel } from "../../model/orders/ItensOrder.Model";

export default interface ItensOrderRepository {
    create(input: ItensOrderModel): Promise<boolean>
    getItemById(itemId: string): Promise<ItensOrderModel | undefined>
    alter(itemId: string, qty_alter: number): Promise<boolean>
    delete(itemId: string): Promise<boolean>
    getItensByOrderId(order_id: string): Promise<ItensOrderModel[]>
}