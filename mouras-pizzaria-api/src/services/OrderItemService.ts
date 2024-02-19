import prismaClient from "../prisma";

interface CreateOrderItemRequest {
    order_id: number,
    product_id: number,
    amount: number,
}

interface RemoveOrderItemRequest {
    order_item_id: number;
}

class OrderItemService {
    async createOrderItem({ order_id, product_id, amount }: CreateOrderItemRequest) {
        if (!(order_id && product_id && amount )) throw new Error ('Missing parameters');

        const orderItem = await prismaClient.orderItem.create({
            data: {
                order_id: order_id,
                product_id: product_id,
                amount: amount,
            },
            select: {
                id: true,
                order_id: true,
                amount: true,
            }
        });

        return orderItem;
    }

    async removeOrderItem({ order_item_id }: RemoveOrderItemRequest) {
        if (!order_item_id) throw new Error ('Missing parameters');

        const orderItem = await prismaClient.orderItem.delete({
            where: {
                id: order_item_id,
            }
        });

        return orderItem;
    }
}

export { OrderItemService }
