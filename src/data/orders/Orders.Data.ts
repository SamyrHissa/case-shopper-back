import { OrdersModel } from "../../model/orders/Orders.Model";
import { dateStrToDate } from "../../utils/functions";
import { BaseDatabase } from "../BaseDatabase";
import OrdersRepository from "./Orders.Repository";

export class OrdersData extends BaseDatabase implements OrdersRepository {
    constructor(){
        super("shopper_Orders")
    }
    async create(input: OrdersModel): Promise<boolean>{
        try {
            await this.getConnection().raw(`
                INSERT INTO ${this.tableName} (
                    id, name_client, delivery_date
                ) VALUES (
                    "${input.getId()}",
                    "${input.getnameClient()}",
                    "${dateStrToDate(input.getDeliveryDate())}"
                )
            `)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
    async getOrders(): Promise<OrdersModel[]>{
        try {
            const result = await this.getConnection().raw(`
                SELECT OD.id Order_id, OD.name_client Cliente, 
                       OD.delivery_date Data_Entrega, 
                       IFNULL(SUM(IOD.qty_requested * IOD.price), 0) Valor
                FROM shopper_Orders OD
                LEFT JOIN shopper_Order_Itens IOD ON IOD.order_id = OD.id
                LEFT JOIN shopper_Products PD ON PD.id = IOD.product_id
                GROUP BY OD.id, OD.name_client, OD.delivery_date
                ORDER BY Data_Entrega
            `)
            return result[0]
        } catch (error) {
            console.log(error)
            return []
        }
    }
    async getOrderById(order_id: string): Promise<OrdersModel | boolean>{
        try {
            const result = await this.getConnection().raw(`
            SELECT OD.id Order_id, OD.name_client Cliente, 
                    OD.delivery_date Data_Entrega, 
                    IFNULL(SUM(IOD.qty_requested * IOD.price), 0) Valor
            FROM shopper_Orders OD
            LEFT JOIN shopper_Order_Itens IOD ON IOD.order_id = OD.id
            LEFT JOIN shopper_Products PD ON PD.id = IOD.product_id
            WHERE OD.id = "${order_id}"
            GROUP BY OD.id, OD.name_client, OD.delivery_date
            `)
                            
            return result[0][0]
        } catch (error) {
            console.log(error)
            return false
        }
    }
    
}