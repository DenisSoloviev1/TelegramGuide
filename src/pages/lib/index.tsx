import { lazy } from "react";
import { Routes } from "@/shared/constants";
import { IRoute, RolesDict } from "@/shared/types";

export const routes: IRoute[] = [
  {
    id: 0,
    index: true,
    path: Routes.HOME,
    component: lazy(() => import("../Home")),
    isPublic: true,
    roles: [RolesDict.ADMIN, RolesDict.USER],
  },
  {
    id: 1,
    path: Routes.POSTS,
    component: lazy(() => import("../Posts")),
    isPublic: true,
    roles: [RolesDict.ADMIN, RolesDict.USER],
  },
  {
    id: 2,
    path: Routes.NOTFOUND,
    component: lazy(() => import("../NotFound")),
    isPublic: true,
    roles: [RolesDict.ADMIN, RolesDict.USER],
  },
  {
    id: 3,
    path: Routes.AUTH,
    component: lazy(() => import("../Auth")),
    isPublic: false,
    roles: [RolesDict.ADMIN],
  },
];
