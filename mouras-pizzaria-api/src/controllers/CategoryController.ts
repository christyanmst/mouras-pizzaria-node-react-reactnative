import { Request, Response } from "express";
import { CategoryService } from "../services/CategoryService";

class CategoryControler {
    async createCategory(req: Request, res: Response) {
        const { name } = req.body;

        const categoryService = new CategoryService();

        const category = await categoryService.createCategory({ name });

        return res.json(category);
    }
}

export { CategoryControler }
