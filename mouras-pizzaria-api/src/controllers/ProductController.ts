import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";

class ProductController {
    async createProduct(req: Request, res: Response) {
        const { name, price, description, category_id } = req.body;

        const productService = new ProductService();

        console.log('req', req.body)
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
}

export { ProductController }