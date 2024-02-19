import { Request, Response } from "express";
import { OrderService } from "../services/OrderService";

class OrderController {
    async createOrder(req: Request, res: Response) {
        const { table_number, name } = req.body;

        const orderService = new OrderService();

        const order = await orderService.createOrder({ table_number, name });
        
        return res.json(order);
    }

    async removeOrder(req: Request, res: Response) {
        const order_id = req.params.order_id;

        const orderService = new OrderService();

        const order = await orderService.removeOrder({ order_id: Number(order_id) });
        
        return res.json(order);
    }

    async confirmOrder(req: Request, res: Response) {
        const order_id = req.params.order_id;

        const orderService = new OrderService();

        const order = await orderService.confirmOrder({ order_id: Number(order_id) });
        
        return res.json(order);
    }

    async getCurrentOrders(_req: Request, res: Response) {
        const orderService = new OrderService();

        const orders = await orderService.getCurrentOrders();

        return res.json(orders);
    }

    async getOrderDetails(req: Request, res: Response) {
        const order_id = req.params.order_id;

        const orderService = new OrderService();

        const orderDetails = await orderService.getOrderDetails({ order_id: Number(order_id) });
    
        return res.json(orderDetails);
    }

    async finishOrder(req: Request, res: Response) {
        const order_id = req.params.order_id

        const orderService = new OrderService();

        const orderDetails = await orderService.finishOrder({ order_id: Number(order_id) });
    
        return res.json(orderDetails);
    }
}

export { OrderController }
