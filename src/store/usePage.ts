import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { encryptStorage } from "@/utils/encryptStore";

/**
 * key: page name, value: last visited time
 */

export interface PageState {
  pages: Record<string, string>;
  addPage: (pageName: string, isoTime: string) => void;
  removePage: (pageName: string) => void;
  updatePage: (pageName: string, isoTime: string) => void;
  removeAllPages: () => void;
}

export const usePage = create<PageState, [["zustand/persist", unknown]]>(
  persist(
    (set) => ({
      pages: {},
      addPage: (pageName, isoTime) =>
        set((state) => ({
          pages: {
            ...state.pages,
            [pageName]: isoTime,
          },
        })),
      removePage: (pageName) =>
        set((state) => ({
          pages: {
            ...state.pages,
            [pageName]: "",
          },
        })),
      updatePage: (pageName, isoTime) =>
        set((state) => ({
          pages: {
            ...state.pages,
            [pageName]: isoTime,
          },
        })),
      removeAllPages: () => set({ pages: {} }),
    }),
    {
      name: "page-count", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => encryptStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
