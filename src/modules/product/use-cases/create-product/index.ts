import { ProductPrismaFactory } from "@/modules/product/factories/product-factory";
import { ProductPrismaRepository } from "@/modules/product/repositories/implementations/product-repository-imp";
import { CreateProductController } from "@/modules/product/use-cases/create-product/create-product-controller";
import { CreateProductUseCase } from "@/modules/product/use-cases/create-product/create-product-use-case";

const productFacotry = new ProductPrismaFactory();
const productRepository = new ProductPrismaRepository(productFacotry);

const createProductUseCase = new CreateProductUseCase(productRepository);
const createProductController = new CreateProductController(
    createProductUseCase,
);

export { createProductController };