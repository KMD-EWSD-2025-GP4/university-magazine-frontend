import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { encryptStorage } from "@/utils/encryptStore";
import { RoleType } from "@/configs/rbac";

interface User {
  userId: string;
  role: RoleType;
  token: string;
  username: string;
  email: string;
  facultyName?: string;
  firstTimeLogin?: boolean;
  lastLogin?: string;
}
export interface UserState {
  user: User | undefined;
  acceptedTerms: boolean;
  setAcceptedTerms: (accepted: boolean) => void;
  setUser: (user: User) => void;
  removeUser: () => void;
}

export const useUserStore = create<UserState, [["zustand/persist", unknown]]>(
  persist(
    (set) => ({
      user: undefined,
      token: undefined,
      setUser: (usr) => {
        set({
          user: {
            userId: usr?.userId,
            username: usr?.username,
            role: usr?.role,
            token: usr?.token,
            email: usr?.email,
            facultyName: usr?.facultyName,
            firstTimeLogin: usr?.firstTimeLogin,
            lastLogin: usr?.lastLogin,
          },
        });
      },
      removeUser: () => set({ user: undefined, acceptedTerms: false }),
      acceptedTerms: false,
      setAcceptedTerms: (accepted) => set({ acceptedTerms: accepted }),
    }),
    {
      name: "auth", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => encryptStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
