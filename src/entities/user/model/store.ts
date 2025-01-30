import { Roles, RolesDict } from "@/shared/types";
import { create } from "zustand";
import { IUser } from "./types";

interface IAuthStore {
  auth: IUser["auth"];
  role: Roles;
  setAuth: (auth: IUser["auth"], role: Roles) => void;
  resetAuth: () => void;
}

const initAuth = localStorage.getItem("auth") || "";
const initRole = (localStorage.getItem("role") as Roles) || RolesDict.USER;

export const useAuthStore = create<IAuthStore>((set) => ({
  auth: initAuth,
  role: initRole,
  setAuth: (auth: IUser["auth"], role: Roles) => {
    set({ role, auth });
    localStorage.setItem("auth", auth);
    localStorage.setItem("role", role);
  },
  resetAuth: () => {
    set({ auth: "", role: RolesDict.USER });
    localStorage.removeItem("auth");
    localStorage.removeItem("role");
  },
}));
