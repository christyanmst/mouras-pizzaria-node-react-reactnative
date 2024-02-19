import { Request, Response } from "express";
import { OrderItemService } from "../services/OrderItemService";

class OrderItemController {
    async createOrderItem(req: Request, res: Response) {
        const { order_id, product_id, amount } = req.body;

        const orderItemService = new OrderItemService();

        const orderItem = await orderItemService.createOrderItem({ order_id, product_id, amount });
        
        return res.json(orderItem);
    }
    async removeOrderItem(req: Request, res: Response) {
        const order_item_id  = req.params.order_item_id;

        const orderItemService = new OrderItemService(); 

        const orderItem = await orderItemService.removeOrderItem({ order_item_id: Number(order_item_id) })
    
        return res.json(orderItem);
    }
}

export { OrderItemController }