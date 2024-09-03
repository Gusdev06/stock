import  { IOffsetGenerator, IOffsetGeneratorParams } from "@/shared/utils/pagination/adapters/i-offset";


export class OffsetGenerator implements IOffsetGenerator {
    generate({ page, limit }: IOffsetGeneratorParams): number {
        return (page ?? 0) * (limit ?? 1);
    }
}