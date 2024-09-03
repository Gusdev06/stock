import { Request, Response, NextFunction } from "express";

import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import  { CreateProductUseCase } from "@/modules/product/use-cases/create-product/create-product-use-case";
import  { IController } from "@/shared/infra/protocols/controller";

class CreateProductController implements IController {
    constructor(private readonly useCase: CreateProductUseCase) {}
    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { name, description, price } = request.body;

            const Product = await this.useCase.execute({
                name,
                description,
                price
            });

            return response.status(HttpStatusCode.CREATED).json(Product);
        } catch (error) {
            next(error);
        }
    }
}

export { CreateProductController };