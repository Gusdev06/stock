import  { IProduct } from "@/modules/product/model/product";
import  { ICreateProductDTO, type IProductRepository } from "@/modules/product/repositories/product-repository";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import  { IUseCase } from "@/shared/infra/protocols/use-case";

export class CreateProductUseCase
    implements IUseCase<ICreateProductDTO, IProduct>
{
    constructor(
        private readonly productRepository: IProductRepository,
    ) {}

    async execute({
        name,
        description,
        price,
    }: ICreateProductDTO): Promise<IProduct> {
        const product = await this.productRepository.create({
            name,
            description,
            price,
        });


         if (!product)
            throw new ErrorHandler(
                "Error on create product",
                HttpStatusCode.BAD_REQUEST,
            );
            
        return product;
    }
}