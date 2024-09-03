import type { ICategoryPrisma } from "@/modules/category/factories/category-factory";
import type { ICategory } from "@/modules/category/model/category";
import  { ICategoryRepository, type ICreateCategoryDTO, type IListCategoryRequest, type IListCategoryResponse } from "@/modules/category/repositories/category-repository";
import { context } from "@/shared/database/context";
import  { IDefaultFactory } from "@/shared/infra/factories/default-factory";
import  { PrismaClient } from "@prisma/client";


class CategoryPrismaRepository implements ICategoryRepository {
    private prismaClient: PrismaClient;

    constructor(
        private readonly categoryPrismaFactory: IDefaultFactory<
            ICategoryPrisma,
            ICategory
        >,
    ) {
        this.prismaClient = context.prisma;
    }

    // async findByName(name: string): Promise<ICategory | undefined> {
    //     const categorysP = await this.prismaClient.category.findFirst({
    //         where: {
    //             name,
    //         },
    //     });

    //     if (!categorysP) return undefined;

    //     return this.categoryPrismaFactory.generate(categorysP);
    // }

    async create({
        name,
        description,

    }: ICreateCategoryDTO): Promise<ICategory | undefined> {
        const categoryP = await this.prismaClient.category.create({
            data: {
                name,
                description,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });

        if (!categoryP) return undefined;

        return this.categoryPrismaFactory.generate(categoryP);
    }

    // async update({
    //     guid,
    //     name,
    //     description,
    // }: IUpdateCategoryDTO): Promise<ICategory | undefined> {
    //     const categoryP = await this.prismaClient.category.update({
    //         where: {
    //             guid,
    //         },
    //         data: {
    //             name,
    //             description,
    //             updatedAt: new Date(),
    //         },
    //     });

    //     if (!categoryP) return undefined;

    //     return this.categoryPrismaFactory.generate(categoryP);
    // }

    // async delete(guid: string): Promise<ICategory | undefined> {
    //     const categorysP = await this.prismaClient.category.delete({
    //         where: {
    //             guid,
    //         },
    //     });

    //     if (!categorysP) return undefined;

    //     return this.categoryPrismaFactory.generate(categorysP);
    // }

    async list({
        search,
        limit,
        offset,
    }: IListCategoryRequest): Promise<IListCategoryResponse | undefined> {
        const where = search
            ? {
                  OR: [
                      {
                          name: {
                              contains: search,
                          },
                      },
                      {
                          description: {
                              contains: search,
                          },
                      },
                  ],
              }
            : undefined;

        const count = await this.prismaClient.category.count({
            where,
        });

        const categorysP = await this.prismaClient.category.findMany({
            where,
            take: limit,
            skip: offset,
        });

        if (!categorysP) return undefined;

        const categorys = await Promise.all(
            categorysP.map(async (categoryP) => {
                return this.categoryPrismaFactory.generate(categoryP);
            }),
        );

        return {
            categorys,
            count,
        };
    }

    async findByGuid(guid: string): Promise<ICategory | undefined> {
        const categorysP = await this.prismaClient.category.findUnique({
            where: {
                guid,
            },
        });

        if (!categorysP) return undefined;

        return this.categoryPrismaFactory.generate(categorysP);
    }
}

export { CategoryPrismaRepository };