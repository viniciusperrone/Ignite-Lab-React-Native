import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IOrder {
  id: string;
  patrimony: string;
  when: string;
  status: "open" | "closed";
}

export interface IOrderResponse {
  id: string;
  patrimony: string;
  description: string;
  status: "open" | "closed";
  created_at: FirebaseFirestoreTypes.Timestamp;
}

export interface IRequest {
  patrimony: string;
  description: string;
}
