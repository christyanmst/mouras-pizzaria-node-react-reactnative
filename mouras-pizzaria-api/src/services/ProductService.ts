import prismaClient from "../prisma";
import fs from 'fs';
import path, { resolve } from 'path';


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

interface GetProductRequest {
    product_id: number;
}

interface UpdateProductRequest {
    product_id: number;
    name: string;
    price: number;
    description: string;
    banner: string;
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

    async getProduct({ product_id }: GetProductRequest) {
        if (!product_id) throw new Error('Missing Parameters');

        const product = await prismaClient.product.findFirst({
            where: {
                id: product_id,
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

    async getProducts() {
        const products = await prismaClient.product.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                banner: true,
                category_id: true,
            }
        });

        return products;
    }

    async editProduct({ product_id, name, price, description, category_id, banner }: UpdateProductRequest) {
        if (!product_id) throw new Error('Missing Parameters');

        const actual_info = await prismaClient.product.findFirst({
            where: {
                id: product_id
            },
            select: {
                id: true,
                banner: true,
            }
        })

        const tmpDir = path.resolve(__dirname, '../../tmp');
        const bannerPath = path.resolve(tmpDir, actual_info.banner);
        await fs.promises.unlink(bannerPath);


        const product = await prismaClient.product.update({
            where: {
                id: product_id,
            },
            data: {
                name,
                price,
                description,
                category_id,
                banner,
            },
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                banner: true,
            }
        });

        return product;
    }
}

export { ProductService }
