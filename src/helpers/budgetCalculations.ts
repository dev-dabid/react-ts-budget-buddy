import type { GroceryItem } from "../types";

export const calculateTotal = (items: GroceryItem[]): number => {
  return items.reduce(
    (t: number, item: GroceryItem) => t + item.price * item.quantity,
    0,
  );
};

export const getRemainingBudget = (budget: number, total: number): number => {
  return budget - total;
};

export const checkOverBudget = (
  budget: number,
  total: number,
  percentage: number,
) => {
  const threshold = (percentage / 100) * budget;
  return total >= threshold;
};
