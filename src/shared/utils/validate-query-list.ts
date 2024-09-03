import { Request } from "express";
import * as Yup from "yup";

export const validateQuery = async (request: Request): Promise<void> => {
    const schema = Yup.object({
        q: Yup.string().trim(),
        l: Yup.number().min(1),
        p: Yup.number().min(0),
    });

    await schema.validate(request);
};