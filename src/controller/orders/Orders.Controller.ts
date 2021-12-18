import { Request, Response } from "express";
import { OrdersBusiness } from "../../business/orders/Orders.Business";
import { OrdersData } from "../../data/orders/Orders.Data";
import { IdGenerator } from "../../services/IdGenerator";

export class OrdersController {
    private ordersBusiness : OrdersBusiness
    constructor(){
        this.ordersBusiness = new OrdersBusiness(
            new IdGenerator(),
            new OrdersData()
        )
    }
    create = async (req: Request, res: Response) => {
        try {
            const {name_client, delivery_date} = req.body
            const result = await this.ordersBusiness.create(name_client, delivery_date)
            res.status(201).send(result)
        } catch (error: any) {
            console.log(error);
            res.status(error.Code).send({ message: error.message })
        }
    }
    getOrders = async (req: Request, res: Response) => {
        try {
            const result = await this.ordersBusiness.getOrders()
            res.status(200).send(result)
        } catch (error: any) {
            console.log(error);
            res.status(error.Code).send({ message: error.message })
        }
    }
    getOrderById = async (req: Request, res: Response) => {
        try {
            const order_id = req.params.order_id;
            const result = await this.ordersBusiness.getOrderById(order_id)
            res.status(200).send(result)
        } catch (error: any) {
            console.log(error);
            res.status(error.code).send({ message: error.message })
            
        }
    }
}