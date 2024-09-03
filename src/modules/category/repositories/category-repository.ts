import { ICategory } from "../model/category";

interface ICreateCategoryDTO {
    name: string;
    description: string;
}

// interface IUpdateCategoryDTO {
//     guid: string;
//     name: string;
//     description?: string;
// }

interface IListCategoryResponse {
    categorys: ICategory[];
    count: number;
}

interface IListCategoryRequest {
    search?: string;
    limit?: number;
    offset?: number;
}

interface ICategoryRepository {
    // findByName(name: string): Promise<ICategory | undefined>;
    create({
        name,
        description,

    }: ICreateCategoryDTO): Promise<ICategory | undefined>;
    // update({
    //     guid,
    //     name,
    //     description,
    // }: IUpdateCategoryDTO): Promise<ICategory | undefined>;
    // delete(guid: string): Promise<ICategory | undefined>;
    list({
        search,
        limit,
        offset,
    }: IListCategoryRequest): Promise<IListCategoryResponse | undefined>;

    // findByGuid(guid: string): Promise<ICategory | undefined>;
}

export {
    ICreateCategoryDTO,
    // IUpdateCategoryDTO,
    IListCategoryResponse,
    IListCategoryRequest,
    ICategoryRepository,
};