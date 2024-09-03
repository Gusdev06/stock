export type OrderParamsType =
    | [
          {
              [x: string]:
                  | string
                  | { [x: string]: string }
                  | { [x: string]: { [x: string]: string } };
          },
      ]
    | [];

export interface ISorting {
    mountOrderParameters(orderBy: string, orderMode?: string): OrderParamsType;
}