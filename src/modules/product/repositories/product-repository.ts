import { IProduct } from "../model/product";

interface ICreateProductDTO {
    name: string;
    description: string;
    price: number;
}

// interface IUpdateProductDTO {
//     guid: string;
//     name: string;
//     description?: string;
// }

interface IListProductResponse {
    products: IProduct[];
    count: number;
}

interface IListProductRequest {
    search?: string;
    limit?: number;
    offset?: number;
}

interface IProductRepository {
    // findByName(name: string): Promise<IProduct | undefined>;
    create({
        name,
        description,
        price,
    }: ICreateProductDTO): Promise<IProduct | undefined>;
    // update({
    //     guid,
    //     name,
    //     description,
    // }: IUpdateProductDTO): Promise<IProduct | undefined>;
    // delete(guid: string): Promise<IProduct | undefined>;
    list({
        search,
        limit,
        offset,
    }: IListProductRequest): Promise<IListProductResponse | undefined>;

    // findByGuid(guid: string): Promise<IProduct | undefined>;
}

export {
    ICreateProductDTO,
    // IUpdateProductDTO,
    IListProductResponse,
    IListProductRequest,
    IProductRepository,
};