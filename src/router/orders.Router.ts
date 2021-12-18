import express from "express"
import { ItensOrderController } from "../controller/itensOrder/ItensOrder.Controller"
import { OrdersController } from "../controller/orders/Orders.Controller"

export const ordersRouter = express.Router()
const ordersController = new OrdersController()
const itensOrderController = new ItensOrderController()

ordersRouter.get("/:order_id", ordersController.getOrderById)
ordersRouter.get("/", ordersController.getOrders)
ordersRouter.post("/", ordersController.create)
ordersRouter.get("/itens/:order_id", itensOrderController.getItensByOrderId)
ordersRouter.post("/itens", itensOrderController.create)
ordersRouter.put("/itens", itensOrderController.alter)
ordersRouter.delete("/itens/:item_id", itensOrderController.delete)
