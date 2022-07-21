import { IPressableProps } from "native-base";
import { IOrder } from "./interfaces";

export type OrderProps = IPressableProps & {
  data: IOrder;
};
