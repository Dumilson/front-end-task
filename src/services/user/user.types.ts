import type { IEntity } from "../sub-types";

export enum Create {
  name = "name",
  email = "email",
  password = "password",
  isAdmin = "isAdmin",
}

export interface CreateInput {
  [Create.name]: string;
  [Create.email]: string;
  [Create.password]: string;
  [Create.isAdmin]: boolean;
}
