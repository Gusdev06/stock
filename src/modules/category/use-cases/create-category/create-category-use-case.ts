import  { ICategory } from "@/modules/category/model/category";
import  { ICreateCategoryDTO, type ICategoryRepository } from "@/modules/category/repositories/category-repository";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import  { IUseCase } from "@/shared/infra/protocols/use-case";

export class CreateCategoryUseCase
    implements IUseCase<ICreateCategoryDTO, ICategory>
{
    constructor(
        private readonly categoryRepository: ICategoryRepository,
    ) {}

    async execute({
        name,
        description,

    }: ICreateCategoryDTO): Promise<ICategory> {
        const category = await this.categoryRepository.create({
            name,
            description,
         
        });


         if (!category)
            throw new ErrorHandler(
                "Error on create category",
                HttpStatusCode.BAD_REQUEST,
            );
            
        return category;
    }
}