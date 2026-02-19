import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BudgetBuddy } from "../types";

export const useStore = create<BudgetBuddy>()(
  persist(
    (set, get) => ({
      budget: 0,
      items: [],

      setBudget: (value: number) =>
        set((state) => ({ budget: isNaN(value) ? state.budget : value })),

      setCart: (value) => set((state) => ({ items: [...state.items, value] })),
    }),
    { name: "budget-storage" },
  ),
);
