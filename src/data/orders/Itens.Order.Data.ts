import { ItensOrderModel } from "../../model/orders/ItensOrder.Model";
import { BaseDatabase } from "../BaseDatabase";
import ItensOrderRepository from "./Itens.Repository";

export class ItensOrderData extends BaseDatabase implements ItensOrderRepository{
    constructor(){
        super("shopper_Order_Itens")
    }
    async create(input: ItensOrderModel): Promise<boolean>{
        try {
            try {                                       // atualiza o estoque do produto
                await this.getConnection().raw(`
                    UPDATE shopper_Products
                    SET qty_stock = qty_stock - ${input.getQty_requested()}
                    WHERE id = ${input.getProductId()}
                `)
            } catch (error) {
                console.log(error)
            return false
            }

            await this.getConnection()
                    .insert({
                        "id": input.getId(),
                        "order_id": input.getOrderId(),
                        "product_id": input.getProductId(),
                        "qty_requested": input.getQty_requested()
                    })
                    .into(this.tableName)
                    
            return true
        } catch (error) {                                       // atualiza o estoque do produto
            await this.getConnection().raw(`
                    UPDATE shopper_Products
                    SET qty_stock = qty_stock + ${input.getQty_requested()}
                    WHERE id = ${input.getProductId()}
                `)
            console.log(error)
            return false
        }
    }
    async getItemById(itemId: string): Promise<ItensOrderModel | undefined>{
        try {
            const result = await this.getConnection()
                                    .select("*")
                                    .from(this.tableName)
                                    .where({
                                        "id": itemId
                                    })
            return result[0]
        } catch (error) {
            console.log(error)
            return undefined
        }
    }
    async alter(itemId: string, qty_alter: number): Promise<boolean>{
        const itemOrder = await this.getConnection()
                            .select("*")
                            .from(this.tableName)
                            .where({
                                "id": itemId
                            })
        try {                                       // atualiza o estoque do produto
            await this.getConnection().raw(`
                UPDATE shopper_Products
                SET qty_stock = qty_stock - ${qty_alter - itemOrder[0].qty_requested}
                WHERE id = "${itemOrder[0].product_id}"
            `)
        } catch (error) {
            console.log(error)
            return false
        }

        try {   
            await this.getConnection().raw(`
                UPDATE shopper_Order_Itens
                SET qty_requested = ${qty_alter}
                WHERE id = "${itemId}"
            `)
            return true
        } catch (error) {                                       // atualiza o estoque do produto
            await this.getConnection().raw(`
                    UPDATE shopper_Products
                    SET qty_stock = qty_stock + ${qty_alter - itemOrder[0].qty_requested}
                    WHERE id = "${itemOrder[0].product_id}"
            `)
            console.log(error)
            return false
        }
        
    }
    async delete(itemId: string): Promise<boolean>{
        const itemOrder = await this.getConnection()
                            .select("*")
                            .from(this.tableName)
                            .where({
                                "id": itemId
                            })
        try {                                       // atualiza o estoque do produto
            await this.getConnection().raw(`
                    UPDATE shopper_Products
                    SET qty_stock = qty_stock + ${itemOrder[0].qty_requested}
                    WHERE id = "${itemOrder[0].product_id}"
            `)
        } catch (error) {
            console.log(error)
            return false
        }
        
        try {
            await this.getConnection()
                    .delete()
                    .from(this.tableName)
                    .where({
                        "id": itemId
                    })
            return true
        } catch (error) {                                       // atualiza o estoque do produto
            await this.getConnection().raw(`
                    UPDATE shopper_Products
                    SET qty_stock = qty_stock - ${itemOrder[0].qty_requested}
                    WHERE id = "${itemOrder[0].product_id}"
            `)
            console.log(error)
            return false
        }
    }
    async getItensByOrderId(order_id: string): Promise<ItensOrderModel[] | undefined>{
        try {
            const result = await this.getConnection()
                    .select("*")
                    .from(this.tableName)
                    .where({order_id})
            
            return result
        } catch (error) {
            console.log(error)
            return undefined
        }
    }
}