import app from "./app"
import { productsRouter } from "./router/products.Router";
import { ordersRouter } from "./router/orders.Router";

 app.use("/products", productsRouter);
 app.use("/Orders", ordersRouter);





