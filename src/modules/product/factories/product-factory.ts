import  { IProduct } from "@/modules/product/model/product";
import  { IDefaultFactory } from "@/shared/infra/factories/default-factory";

import { Product as PProduct } from "@prisma/client";



export interface IProductPrisma extends PProduct {}

export class ProductPrismaFactory
    implements IDefaultFactory<IProductPrisma, IProduct>
{
    async generate(entity: IProductPrisma): Promise<IProduct> {
        const result = {
            id: entity.id,
            guid: entity.guid,
            name: entity.name,
            price: entity.price,
            description: entity.description,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };

        return result;
    }
}