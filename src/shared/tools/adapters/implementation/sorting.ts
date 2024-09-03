import  { ISorting, OrderParamsType } from "@/shared/tools/adapters/i-sorting";


export class Sorting implements ISorting {
    mountOrderParameters(orderBy: string, orderMode: string): OrderParamsType {
        let orderObject: OrderParamsType = [];

        const mode = orderMode || "desc";

        orderObject = [{ [orderBy]: mode }];

        if (orderBy.includes(".")) {
            const orderByArray = orderBy.split(".");

            const relation = orderByArray[0];
            const subRelation = orderByArray[1];
            const key = orderByArray[orderByArray.length - 1];

            const object = { [key]: mode };

            orderObject = [
                {
                    [relation]:
                        subRelation !== key
                            ? { [subRelation]: object }
                            : object,
                },
            ];
        }

        return orderObject;
    }
}