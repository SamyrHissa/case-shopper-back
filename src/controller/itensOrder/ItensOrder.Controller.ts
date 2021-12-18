import { Request, Response } from "express";
import { ItensOrderBusiness } from "../../business/intesOrder/ItensOrder.Business";
import { ItensOrderData } from "../../data/orders/Itens.Order.Data";
import { OrdersData } from "../../data/orders/Orders.Data";
import { ProductsData } from "../../data/products/Products.Data";
import { IdGenerator } from "../../services/IdGenerator";

export class ItensOrderController{
    private itensOrderBusiness: ItensOrderBusiness
    constructor(){
        this.itensOrderBusiness = new ItensOrderBusiness(
            new IdGenerator(),
            new ItensOrderData(),
            new OrdersData(),
            new ProductsData()
        )
    }
    create = async (req:Request, res: Response) => {
        try {
            const {order_id, product_id, qty_requested} = req.body
            const result = await this.itensOrderBusiness.create(
                order_id,
                product_id,
                qty_requested
            )
            res.status(201).send(result)
        } catch (error: any) {
            console.log(error);
            res.status(error.Code).send({ message: error.message })
        }
        

    }

    alter = async (req: Request, res: Response) => {
        try {
            const {item_id, qty_alter} = req.body;
            const result = await this.itensOrderBusiness.alterItem(item_id, qty_alter)
            res.status(201).send(result)
        } catch (error: any) {
            console.log(error);
            res.status(error.Code).send({ message: error.message })
        }
    }

    delete = async (req:Request, res: Response) => {
        try {
            const item_id = req.params.item_id
            const result = await this.itensOrderBusiness.deleteItem(item_id)
            res.status(201).send(result)
        } catch (error: any) {
            console.log(error);
            res.status(error.Code).send({ message: error.message })
        }
    }
    getItensByOrderId = async (req:Request, res: Response) => {
        try {
            const order_id = req.params.order_id
            const result = await this.itensOrderBusiness.getItensByOrderId(order_id)
            res.status(201).send(result)
        } catch (error: any) {
            console.log(error);
            res.status(error.Code).send({ message: error.message })
        }
        

    }
}