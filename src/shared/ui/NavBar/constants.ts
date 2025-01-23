import { ReactNode } from "react";
import { RolesDict } from "@/shared/types";
import { Routes } from "@/shared/constants";
import {} from "@/shared/ui/Icon";

export interface INav {
  id: number;
  path: string;
  label: string;
  svg?: ReactNode;
  allowedRoles: string[];
}

export const NavItems: INav[] = [
  {
    id: 0,
    path: Routes.HOME,
    label: "главная",
    allowedRoles: [RolesDict.ADMIN, RolesDict.USER],
  },
  {
    id: 1,
    path: Routes.POSTS,
    label: "публикации",
    allowedRoles: [RolesDict.ADMIN, RolesDict.USER],
  },
  {
    id: 2,
    path: Routes.COLLECTIONS,
    label: "подборки",
    allowedRoles: [RolesDict.ADMIN, RolesDict.USER],
  },
  {
    id: 3,
    path: Routes.NOMINATIONS,
    label: "номинации",
    allowedRoles: [RolesDict.ADMIN, RolesDict.USER],
  },
  {
    id: 4,
    path: Routes.AUTH,
    label: "авторизоваться",
    allowedRoles: [RolesDict.ADMIN],
  },
  {
    id: 5,
    path: Routes.HOME,
    label: "выйти",
    allowedRoles: [RolesDict.ADMIN],
  },
];
