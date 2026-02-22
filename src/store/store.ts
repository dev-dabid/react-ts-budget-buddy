import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BudgetBuddy } from "../types";

export const useStore = create<BudgetBuddy>()(
  persist(
    (set) => ({
      budget: 0,
      items: [],

      setBudget: (value: number) =>
        set((state) => ({
          budget: isNaN(value)
            ? state.budget
            : value >= 999999999
              ? state.budget
              : value,
        })),

      setCart: (value) => set((state) => ({ items: [...state.items, value] })),

      removeCartItem: (id: string) =>
        set((state) => ({
          items: state.items.filter((item) => {
            return item.id !== id;
          }),
        })),
    }),
    { name: "budget-storage" },
  ),
);
