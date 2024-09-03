import { createCategoryController } from "@/modules/category/use-cases/create-category";
// import { listCategorysController } from "@/modules/category/use-cases/list-category";
import { Router } from "express";

const categoryRoutes = Router();

categoryRoutes.post("/",  (request, response, next) => {
    return createCategoryController.handle(request, response, next);
});

// categoryRoutes.get("/list",  (request, response, next) => {
//     return listCategorysController.handle(request, response, next);
// });

export { categoryRoutes };
