import { LazyExoticComponent, ComponentType } from "react";

type ValueOf<T> = T[keyof T];

export const RolesDict = {
  ADMIN: "админ",
  USER: "пользователь",
} as const;

export type Roles = ValueOf<typeof RolesDict>;

export interface IRoute {
  id: number;
  index?: boolean;
  path?: string;
  isPublic: boolean;
  component: LazyExoticComponent<ComponentType<any>>;
  roles: Roles[];
}
