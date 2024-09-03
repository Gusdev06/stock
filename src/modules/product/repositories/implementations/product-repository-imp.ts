import type { IProductPrisma } from "@/modules/product/factories/product-factory";
import type { IProduct } from "@/modules/product/model/product";
import  { IProductRepository, type ICreateProductDTO, type IListProductRequest, type IListProductResponse } from "@/modules/product/repositories/product-repository";
import { context } from "@/shared/database/context";
import  { IDefaultFactory } from "@/shared/infra/factories/default-factory";
import  { PrismaClient } from "@prisma/client";


class ProductPrismaRepository implements IProductRepository {
    private prismaClient: PrismaClient;

    constructor(
        private readonly productPrismaFactory: IDefaultFactory<
            IProductPrisma,
            IProduct
        >,
    ) {
        this.prismaClient = context.prisma;
    }

    // async findByName(name: string): Promise<IProduct | undefined> {
    //     const productsP = await this.prismaClient.product.findFirst({
    //         where: {
    //             name,
    //         },
    //     });

    //     if (!productsP) return undefined;

    //     return this.productPrismaFactory.generate(productsP);
    // }

    async create({
        name,
        description,
        price,
    }: ICreateProductDTO): Promise<IProduct | undefined> {
        const productP = await this.prismaClient.product.create({
            data: {
                name,
                description,
                price,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });

        if (!productP) return undefined;

        return this.productPrismaFactory.generate(productP);
    }

    // async update({
    //     guid,
    //     name,
    //     description,
    // }: IUpdateProductDTO): Promise<IProduct | undefined> {
    //     const productP = await this.prismaClient.product.update({
    //         where: {
    //             guid,
    //         },
    //         data: {
    //             name,
    //             description,
    //             updatedAt: new Date(),
    //         },
    //     });

    //     if (!productP) return undefined;

    //     return this.productPrismaFactory.generate(productP);
    // }

    // async delete(guid: string): Promise<IProduct | undefined> {
    //     const productsP = await this.prismaClient.product.delete({
    //         where: {
    //             guid,
    //         },
    //     });

    //     if (!productsP) return undefined;

    //     return this.productPrismaFactory.generate(productsP);
    // }

    async list({
        search,
        limit,
        offset,
    }: IListProductRequest): Promise<IListProductResponse | undefined> {
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

        const count = await this.prismaClient.product.count({
            where,
        });

        const productsP = await this.prismaClient.product.findMany({
            where,
            take: limit,
            skip: offset,
        });

        if (!productsP) return undefined;

        const products = await Promise.all(
            productsP.map(async (productP) => {
                return this.productPrismaFactory.generate(productP);
            }),
        );

        return {
            products,
            count,
        };
    }

    async findByGuid(guid: string): Promise<IProduct | undefined> {
        const productsP = await this.prismaClient.product.findUnique({
            where: {
                guid,
            },
        });

        if (!productsP) return undefined;

        return this.productPrismaFactory.generate(productsP);
    }
}

export { ProductPrismaRepository };