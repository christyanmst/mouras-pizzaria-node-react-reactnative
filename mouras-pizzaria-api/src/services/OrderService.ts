import prismaClient from "../prisma";

interface CreateOrderRequest {
    table_number: number;
    name: string;
}

interface HandleOrderRequest {
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

    async removeOrder({ order_id }: HandleOrderRequest) {
        if (!order_id) throw new Error('Missing parameters');

        const order = await prismaClient.order.delete({
            where: {
                id: order_id,
            }
        });

        return order;
    }

    async confirmOrder({ order_id }: HandleOrderRequest) {
        if (!order_id) throw new Error('Missing parameters');

        const order = await prismaClient.order.update({
            where: {
                id: order_id,
            },
            data: {
                draft: false
            }
        });

        return order;
    }

    async getCurrentOrders() {
        const orders = await prismaClient.order.findMany({
            where: {
                draft: false,
                status: false,
            }, 
            orderBy: {
                created_at: 'desc',
            },
            select: {
                id: true,
                table_number: true,
                name: true,
            }
        });

        return orders;
    }

    async getOrderDetails({ order_id }: HandleOrderRequest) {
        if (!order_id) throw new Error('Missing parameters');
        
        const orderItemsDetails = await prismaClient.orderItem.findMany({
            where: {
                order_id: order_id,
            },
            select:{
                id: true,
                amount: true,
                product: {
                    select: {
                        id: true,
                        category_id: true,
                        name: true,
                        price: true,
                        description: true,
                        banner: true,
                    }
                }
            },
        });

        const orderDetails = await prismaClient.order.findFirst({
            where: {
                id: order_id,
            },
            select: {
                id: true,
                name: true,
                table_number: true,
                draft: true,
                status: true,
            }
        });

        return { ...orderDetails, orderItems: orderItemsDetails }
    }

    async finishOrder({ order_id }: HandleOrderRequest) {
        if (!order_id) throw new Error('Missing parameters');

        const order = await prismaClient.order.update({
            where: {
                id: order_id,
            },
            data: {
                status: true,
            },
        });

        return order;
    }
}

export { OrderService }; 
