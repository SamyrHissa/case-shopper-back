import { ItensOrderData } from "../../data/orders/Itens.Order.Data";
import { OrdersData } from "../../data/orders/Orders.Data";
import { ProductsData } from "../../data/products/Products.Data";
import BaseError from "../../error/BaseError";
import { ItensOrderModel } from "../../model/orders/ItensOrder.Model";
import { ProductsModel } from "../../model/products/Products.Model";
import { IdGenerator } from "../../services/IdGenerator";

export class ItensOrderBusiness {
    constructor(
        private idGenerator: IdGenerator,
        private data: ItensOrderData,
        private ordersData: OrdersData,
        private productsData: ProductsData
    ){}
    create = async (orderId: string, productId: string, qty_requested: number) => {
        if((!orderId) || (!productId) || (!qty_requested)){
            throw new BaseError ("Todos os campos são obrigatórios!", 422);
        }
        if(!await this.ordersData.getOrderById(orderId)){
            throw new BaseError ("order_id não encontrado!", 404);
        }
        const product: ProductsModel | undefined = await this.productsData.getProductById(productId);
        if(!product){
            throw new BaseError ("product_id não encontrado!", 404);
        }
        const id = this.idGenerator.generate();
        const newItemOrder = new ItensOrderModel(
            id,
            orderId,
            productId,
            qty_requested,
            product.getPrice()
        )
        const result = await this.data.create(newItemOrder)
        if(result){
            return {
                message: 'Item criado com sucesso!',
                id: id
            }
        } else {
            throw new BaseError ("Ocorreu um erro inesperado, tente mais tarde!", 400)
        }
    }
    alterItem = async (itemId: string, qtyAlter: number) => {
        if(!itemId || !(qtyAlter > 0)){
            throw new BaseError ("O 'item_id' é obrigatório e quantidade tem que ser maior que 0!", 422);
        }
        const itemIdExiste = await this.data.getItemById(itemId);
        if(!itemIdExiste){
            throw new BaseError ("'itemId' não encontrado!", 404)
        }
        const result = await this.data.alter(itemId, qtyAlter);
        if(result){
            return {
                message: 'Item alterado com sucesso!',
                id: itemId
            }
        } else {
            throw new BaseError ("Ocorreu um erro inesperado, tente mais tarde!", 400)
        }
    }
    deleteItem = async (itemId: string) => {
        if(!itemId){
            throw new BaseError ("O 'item_id' é obrigatório!", 422);
        }
        const result = await this.data.delete(itemId);
        if(result){
            return {
                message: 'Item deletado com sucesso!',
                id: itemId
            }
        } else {
            throw new BaseError ("Ocorreu um erro inesperado, tente mais tarde!", 400)
        }
    }
    getItensByOrderId = async (order_id: string) => {
        if(!order_id){
            throw new BaseError ("'order_id' é obrigatório!", 422);
        }
        const result = await this.data.getItensByOrderId(order_id)
        if(result){
            return result
        } else {
            throw new BaseError ("Ocorreu um erro inesperado, tente mais tarde!", 400)
        }
    }
}