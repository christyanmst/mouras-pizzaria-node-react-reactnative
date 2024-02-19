import prismaClient from "../prisma";

interface CreateOrderRequest {
    table_number: number;
    name: string;
}

interface CloseOrderRequest {
    order_id: number;
}

class OrderService {
    async createOrder({ table_number, name }: CreateOrderRequest) {
        if (!table_number) throw new Error('Missing parameters');

        const order = await prismaClient.order.create({
            data: {
                table_number: table_number,
                name: name,
            },
            select: {
                id: true,
                table_number: true,
                name: true,
            }
        });

        return order;
    }

    async removeOrder({ order_id }: CloseOrderRequest) {
        if (!order_id) throw new Error('Missing parameters');

        const order = await prismaClient.order.delete({
            where: {
                id: order_id,
            }
        });

        return order;
    }
}

export { OrderService }; 
