import { OrdersData } from "../../data/orders/Orders.Data";
import BaseError from "../../error/BaseError";
import { OrdersModel } from "../../model/orders/Orders.Model";
import { IdGenerator } from "../../services/IdGenerator";

export class OrdersBusiness {
    constructor(
        private idGenerator: IdGenerator,
        private data: OrdersData
    ){}
    create = async (name_client: string, delivery_date: string) => {
        
        if((name_client === '') || (delivery_date === '') || !name_client || !delivery_date){
            throw new BaseError ("Todos os campos são obrigatórios", 422);
        }
        const id = this.idGenerator.generate();
        const newOrder = new OrdersModel(
            id,
            name_client,
            delivery_date
        )
        
        
        const result = await this.data.create(newOrder)
        if(result){
            return {
                message: 'Pedido criado com sucesso!',
                id: id
            }
        } else {
            throw new BaseError ("Ocorreu um erro inesperado, tente mais tarde!", 400)
        }
    }
    getOrders = async () => {
        const result = await this.data.getOrders()
        if(result){
            return result
         } else {
             throw new BaseError("Sem pedidos cadastrados!", 404)
         }
    }
    getOrderById = async (order_id: string) => {
        if(!order_id){
            throw new BaseError ("'order_id é obrigatório!", 422);
        }
        const result = await this.data.getOrderById(order_id)
        if(result){
            return result
        } else {
            throw new BaseError("Pedido não encontrado!", 404)
            
        }

    }
}