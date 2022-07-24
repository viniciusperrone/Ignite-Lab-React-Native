import React, { ReactNode } from "react";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { IPressableProps } from "native-base";
import { IconProps } from "phosphor-react-native";
import { IOrder } from "./interfaces";

export type RouterParams = {
  orderId: string;
};

export type OrderProps = IPressableProps & {
  data: IOrder;
};

export type OrderFirestore = {
  id: string;
  patrimony: string;
  description: string;
  status: "open" | "closed";
  solution?: string;
  created_at: FirebaseFirestoreTypes.Timestamp;
  closed_at?: FirebaseFirestoreTypes.Timestamp;
};

export type CardDetailsIcon = {
  title: string;
  description?: string;
  footer?: string;
  icon: React.ElementType<IconProps>;
  children?: ReactNode;
};
