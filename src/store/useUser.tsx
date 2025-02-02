import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { encryptStorage } from "@/utils/encryptStore";

interface User {
  role: string;
  token: string;
  username: string;
}
export interface UserState {
  user: User | undefined;
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
            username: usr?.username,
            role: usr?.role,
            token: usr?.token,
          },
        });
      },
      removeUser: () => set({ user: undefined }),
    }),
    {
      name: "storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => encryptStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
