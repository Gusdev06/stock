import { createProductController } from "@/modules/product/use-cases/create-product";
import { listProductsController } from "@/modules/product/use-cases/list-product";
import { Router } from "express";

const productRoutes = Router();

productRoutes.post("/",  (request, response, next) => {
    return createProductController.handle(request, response, next);
});

productRoutes.get("/list",  (request, response, next) => {
    return listProductsController.handle(request, response, next);
});

export { productRoutes };
