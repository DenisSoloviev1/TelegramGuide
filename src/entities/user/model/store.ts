import { Roles, RolesDict } from "@/shared/types";
import { create } from "zustand";

interface IAuthStore {
  role: Roles;
  setRole: (role: Roles) => void;
  resetAuth: () => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  // role: RolesDict.USER,
  role: RolesDict.ADMIN,
  setRole: (role: Roles) => {
    set({ role: role });
  },
  resetAuth: () => {
    set({
      role: RolesDict.USER,
    }),
      localStorage.removeItem("authToken");
  },
}));
