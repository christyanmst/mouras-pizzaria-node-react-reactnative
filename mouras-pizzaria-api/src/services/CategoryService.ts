import prismaClient from "../prisma";

interface CategoryRequest {
    name: string;
}

class CategoryService {
    async createCategory({ name }: CategoryRequest) {
        if(!name.length) throw new Error('Name Invalid');

        const category = await prismaClient.category.create({
            data: {
                name: name,
            },
            select: {
                id: true,
                name: true,
            }
        });

        return category;
    }
}

export { CategoryService }
