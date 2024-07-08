import type { ICreatedInstance } from ".";

export interface IUser extends ICreatedInstance {
  id: string;
  name: string;
  email: string;
  isAdmin: number;
}

export const userSchema: IUser = {
  id: "",
  name: "",
  email: "",
  isAdmin: 0,
  created_at: "",
  updated_at: "",
};
