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