import  { IProduct } from "@/modules/product/model/product";
import  { IProductRepository } from "@/modules/product/repositories/product-repository";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import  { IListPaginatedUseCase,  IListUseCaseParams } from "@/shared/infra/protocols/list-use-case";
import  { ISorting } from "@/shared/tools/adapters/i-sorting";
import  { ICurrentPageValidation } from "@/shared/utils/pagination/adapters/i-current-page-validation";
import  { IOffsetGenerator } from "@/shared/utils/pagination/adapters/i-offset";
import  { ITotalPagesGenerator } from "@/shared/utils/pagination/adapters/i-total-pages-generator";
import  { IPaginationResponse } from "@/shared/utils/pagination/interfaces/i-pagination-response";

export class ListProductUseCase implements IListPaginatedUseCase<IProduct> {
    constructor(
        private readonly repository: IProductRepository,
        private readonly sorting: ISorting,
        private readonly offsetGenerator: IOffsetGenerator,
        private readonly totalPagesGenerator: ITotalPagesGenerator,
        private readonly currentPageValidation: ICurrentPageValidation,
    ) {}
    async execute({
        search,
        limit,
        page,
    }: IListUseCaseParams): Promise<IPaginationResponse<IProduct>> {
        const offset = this.offsetGenerator.generate({ page, limit });

        const products = await this.repository.list({
            search,
            limit: page !== undefined && limit ? limit : undefined,
            offset: page !== undefined && limit ? offset : undefined,
        });

        if (!products)
            throw new ErrorHandler(
                "Error on get products from database",
                HttpStatusCode.BAD_REQUEST,
            );

        const totalPages = this.totalPagesGenerator.generate({
            totalRegisters: products.count,
            limit,
        });

        this.currentPageValidation.validate({
            totalPages,
            currentPage: page,
        });

        return {
            result: products.products,
            currentPage: page ?? 0,
            totalRegisters: products.count,
            totalPages,
        };
    }
}