import { ProductPrismaFactory } from "@/modules/product/factories/product-factory";
import { ProductPrismaRepository } from "@/modules/product/repositories/implementations/product-repository-imp";
import { ListProductsController } from "@/modules/product/use-cases/list-product/list-product-controller";
import { ListProductUseCase } from "@/modules/product/use-cases/list-product/list-product-use-case";
import { Sorting } from "@/shared/tools/adapters/implementation/Sorting";
import { CurrentPageValidation } from "@/shared/utils/pagination/adapters/implementations/current-page-validation";
import { OffsetGenerator } from "@/shared/utils/pagination/adapters/implementations/offset";
import { TotalPagesGenerator } from "@/shared/utils/pagination/adapters/implementations/total-pages-generator";

const productFactory = new ProductPrismaFactory();
const productRepository = new ProductPrismaRepository(productFactory);
const sorting = new Sorting();
const offsetGenerator = new OffsetGenerator();
const totalPagesGenerator = new TotalPagesGenerator();
const currentPageValidation = new CurrentPageValidation();
const listProductUseCase = new ListProductUseCase(
    productRepository,
    sorting,
    offsetGenerator,
    totalPagesGenerator,
    currentPageValidation,
);

const listProductsController = new ListProductsController(listProductUseCase);

export { listProductsController };