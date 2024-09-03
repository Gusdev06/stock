import { Request, Response, NextFunction } from "express";

import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import  { CreateCategoryUseCase } from "@/modules/category/use-cases/create-category/create-category-use-case";
import  { IController } from "@/shared/infra/protocols/controller";

class CreateCategoryController implements IController {
    constructor(private readonly useCase: CreateCategoryUseCase) {}
    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { name, description, } = request.body;

            const Category = await this.useCase.execute({
                name,
                description,
               
            });

            return response.status(HttpStatusCode.CREATED).json(Category);
        } catch (error) {
            next(error);
        }
    }
}

export { CreateCategoryController };