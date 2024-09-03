import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import  { ICurrentPageValidation, type ICurrentPageValidationParams } from "@/shared/utils/pagination/adapters/i-current-page-validation";



export class CurrentPageValidation implements ICurrentPageValidation {
    validate({
        currentPage,
        totalPages,
    }: ICurrentPageValidationParams): boolean {
        if (totalPages === 0 && currentPage === 0) {
            return true;
        }

        if ((currentPage ?? 0) >= totalPages) {
            throw new ErrorHandler(
                "Page out of bounds",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        return true;
    }
}