import { CategoryPrismaFactory } from "@/modules/category/factories/category-factory";
import { CategoryPrismaRepository } from "@/modules/category/repositories/implementations/category-repository-imp";
import { CreateCategoryController } from "@/modules/category/use-cases/create-category/create-category-controller";
import { CreateCategoryUseCase } from "@/modules/category/use-cases/create-category/create-category-use-case";

const categoryFacotry = new CategoryPrismaFactory();
const categoryRepository = new CategoryPrismaRepository(categoryFacotry);

const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
const createCategoryController = new CreateCategoryController(
    createCategoryUseCase,
);

export { createCategoryController };