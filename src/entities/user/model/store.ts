import { Roles } from "@/shared/types";
import { create } from "zustand";

interface IAuthStore {
  isAuth: boolean;
  role: Roles;
  setRole: (role: Roles) => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  isAuth: false,
  role: "" as Roles,
  setRole: (role: Roles) => {
    set({ isAuth: true, role: role });
  },
}));
