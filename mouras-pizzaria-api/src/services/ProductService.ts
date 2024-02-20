import prismaClient from "../prisma";

interface CreateProductRequest {
    name: string;
    price: number;
    description: string;
    banner: string;
    category_id: number;
}

interface GetProductByCategoryRequest{
    category_id: number;
}

class ProductService {
    async createProduct({ name, price, description, banner, category_id}: CreateProductRequest) {
        if (!(name && price && description && banner && category_id)) throw new Error('Missing parameters');
        
        const product = await prismaClient.product.create({
            data: {
                name: name,
                price: Number(price),
                description: description,
                banner: banner,
                category_id: Number(category_id)
            },
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                banner: true,
                category_id: true,
            }
        });


        return product;
    }

    async getProductsByCategoryId({ category_id }: GetProductByCategoryRequest) {
        if (!category_id) throw new Error('Missing parameters');

        const products = await prismaClient.product.findMany({
            where: {
                category_id: category_id,
            },
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                banner: true,
            }
        });

        return products;
    }
}

export { ProductService }
