import { ReactNode } from "react";
import { RolesDict } from "@/shared/types";
import { Path } from "@/shared/constants";
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
    path: Path.HOME,
    label: "главная",
    allowedRoles: [RolesDict.ADMIN, RolesDict.USER],
  },
  {
    id: 1,
    path: Path.POSTS,
    label: "публикации",
    allowedRoles: [RolesDict.ADMIN, RolesDict.USER],
  },
  {
    id: 2,
    path: Path.COLLECTIONS,
    label: "подборки",
    allowedRoles: [RolesDict.ADMIN, RolesDict.USER],
  },
  {
    id: 3,
    path: Path.NOMINATIONS,
    label: "номинации",
    allowedRoles: [RolesDict.ADMIN, RolesDict.USER],
  },
  {
    id: 4,
    path: Path.AUTH,
    label: "авторизоваться",
    allowedRoles: [RolesDict.ADMIN],
  },
  {
    id: 5,
    path: Path.HOME,
    label: "выйти",
    allowedRoles: [RolesDict.ADMIN],
  },
];
