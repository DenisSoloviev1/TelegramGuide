import { Roles } from "@/shared/types";

export interface IUser {
  id: number;
  role: Roles;
  userName: string;
}
