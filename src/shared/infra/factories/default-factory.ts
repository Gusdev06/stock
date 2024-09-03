export interface IDefaultFactory<T_ENTITY, T_MODEL> {
    generate(entity: T_ENTITY): Promise<T_MODEL>;
}