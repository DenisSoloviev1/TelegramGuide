import { Roles } from "@/shared/types";

export interface IUser {
  auth: string;
  role: Roles;
  userName?: string;
}

export interface IAuth {
  login: string;
  password: string;
}
