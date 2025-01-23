import { Roles, RolesDict } from "@/shared/types";
import { create } from "zustand";

interface IAuthStore {
  isAuth: boolean;
  role: Roles;
  setRole: (role: Roles) => void;
  resetAuth: () => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  isAuth: false,
  // role: RolesDict.USER,
  role: RolesDict.ADMIN,
  setRole: (role: Roles) => {
    set({ isAuth: true, role: role });
  },
  resetAuth: () => {
    set({
      isAuth: false,
      role: RolesDict.USER,
    }),
      localStorage.removeItem("authToken");
  },
}));
