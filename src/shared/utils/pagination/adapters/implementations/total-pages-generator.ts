import type { ITotalPagesGenerator, ITotalPagesGeneratorParams } from "@/shared/utils/pagination/adapters/i-total-pages-generator";


export class TotalPagesGenerator implements ITotalPagesGenerator {
    generate({ totalRegisters, limit }: ITotalPagesGeneratorParams): number {
        return Math.ceil(totalRegisters / (limit ?? totalRegisters));
    }
}