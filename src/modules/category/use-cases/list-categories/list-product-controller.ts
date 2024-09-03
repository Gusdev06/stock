import { Request, Response, NextFunction } from "express";

import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";

import  { ListProductUseCase } from "@/modules/product/use-cases/list-product/list-product-use-case";
import  { IController } from "@/shared/infra/protocols/controller";
import { validateQuery } from "@/shared/utils/validate-query-list";


export class ListProductsController implements IController {
    constructor(private readonly listProductsUseCase: ListProductUseCase) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            await validateQuery(request);
            const {
                q: search,
                p: page,
                l: limit,
                orderBy,
                orderMode,
            } = request.query;

            const products = await this.listProductsUseCase.execute({
                search: search?.toString(),
                limit: limit ? Number(limit) : undefined,
                page: limit ? Number(page) : undefined,
                orderBy: orderBy?.toString(),
                orderMode: orderMode?.toString(),
            });

            return response.status(HttpStatusCode.OK).json(products);
        } catch (error) {
            next(error);
        }
    }
}