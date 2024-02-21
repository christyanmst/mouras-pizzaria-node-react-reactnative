import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";

class ProductController {
    async createProduct(req: Request, res: Response) {
        const { name, price, description, category_id } = req.body;

        const productService = new ProductService();

        if (!req.file) throw new Error("error upload file");

        const { filename: banner } = req.file;

        const product = await productService.createProduct({ name, price, description, banner, category_id });
        
        return res.json(product);
    }

    async getProductsByCategoryId(req: Request, res: Response) {
        const category_id = req.params.category_id;

        const productService = new ProductService();

        const products = await productService.getProductsByCategoryId({ category_id: Number(category_id) });

        return res.json(products);
    }

    async getProduct(req: Request, res: Response) {
        const product_id = req.params.product_id;

        const productService = new ProductService();

        const product = await productService.getProduct({ product_id: Number(product_id) });

        return res.json(product);
    }

    async editProduct(req: Request, res: Response) {
        const { product_id, name, price, description, category_id } = req.body;

        const productService = new ProductService();

        if (!req.file) throw new Error("error upload file");

        const { filename: banner } = req.file;

        const product = await productService.editProduct({ product_id: Number(product_id), name, price: Number(price), description, category_id: Number(category_id), banner });

        return res.json(product);
    }

    async getProducts(_req: Request, res: Response) {
        const productService = new ProductService();
        console.log('entrou');

        const products = await productService.getProducts();

        res.json(products);
    }

    async deleteProduct(req: Request, res: Response) {
        const product_id = req.params.product_id;

        const productService = new ProductService();

        const product = await productService.deleteProduct({ product_id: Number(product_id) });

        return res.json(product);
    }
}

export { ProductController }