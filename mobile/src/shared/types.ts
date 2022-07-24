import { IPressableProps } from "native-base";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { IOrder } from "./interfaces";

export type OrderProps = IPressableProps & {
  data: IOrder;
};

export type OrderFirestore = {
  patrimony: string;
  description: string;
  status: "open" | "closed";
  solution?: string;
  created_at: FirebaseFirestoreTypes.Timestamp;
  closed_at?: FirebaseFirestoreTypes.Timestamp;
};
