export interface GroceryItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface BudgetBuddy {
  budget: number;
  items: GroceryItem[];
  setBudget: (value: number) => void;
  setCart: (value: GroceryItem) => void;
  removeCartItem: (id: string) => void;
}
