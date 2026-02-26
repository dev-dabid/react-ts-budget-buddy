import type { ChangeEvent } from "react";
import type { GroceryItem } from "./types/index";
import { useStore } from "./store/store";
import { useState } from "react";
import {
  calculateTotal,
  getRemainingBudget,
  checkOverBudget,
} from "./helpers/budgetCalculations";

import Form from "./components/Form";
import Button from "./components/Button";
import bblogo from "./assets/budget-buddy-logo.svg";

const App = () => {
  //STATES
  const budget = useStore((state) => state.budget);
  const items = useStore((state) => state.items);

  //HELPERS
  const total = calculateTotal(items);
  const remaining = getRemainingBudget(budget, total);
  const isOverBudget = checkOverBudget(budget, total, 100);
  const isDanger = checkOverBudget(budget, total, 80);
  const isWarning = checkOverBudget(budget, total, 50);

  //ACTIONS
  const setBudget = useStore((state) => state.setBudget);
  const setCart = useStore((state) => state.setCart);
  const removeCartItem = useStore((state) => state.removeCartItem);

  //LOCAL STATES
  const [details, setDetails] = useState<GroceryItem>({
    id: Date.now().toString(),
    name: "",
    price: 0,
    quantity: 1,
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setDetails((prev) => {
      if (type === "number") {
        if (value === "") {
          return { ...prev, [name]: "" };
        }

        let num = Number(value);

        if (num < 0) num = 0;

        if (name === "quantity" && num > 999) {
          num = 999;
        }

        if (name === "price" && num > 999999) {
          num = 999999;
        }

        return { ...prev, [name]: num };
      }

      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = () => {
    setCart({ ...details, id: Date.now().toString() });
    setDetails({ id: "", name: "", price: 0, quantity: 1 });
  };

  return (
    <div className="flex justify-center flex-col items-center itim-regular p-2 max-w-300 mx-auto">
      <img src={bblogo} alt="" />
      <div className="flex items-end mt-10 w-full">
        <p className="text-3xl sm:text-7xl">Budget:</p>
        <div className="border-b-2 w-full border-[#F39B9A]">
          <input
            className="outline-none text-2xl sm:text-5xl pl-5 w-full"
            type="text"
            value={budget}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setBudget(Number(e.target.value))
            }
          />
        </div>
      </div>

      <div className="flex justify-start w-full mt-13">
        <Button clickEvent={setIsOpen} />
      </div>

      <div className="text-center mt-15">
        <p className="text-lg sm:text-2xl">Budget {`(-)`} minus Products</p>
        <p
          className={`text-5xl sm:text-7xl ${budget === 0 ? "text-gray-500" : isOverBudget ? "text-red-700" : isDanger ? "text-red-500" : isWarning ? "text-yellow-500" : "text-[#F39B9A]"} `}
        >
          {budget && remaining}
        </p>
        <p
          className={`text-3xl ${budget === 0 ? "text-gray-500" : isOverBudget ? "text-red-700" : isDanger ? "text-red-500" : isWarning ? "text-yellow-500" : "text-[#F39B9A]"}`}
        >
          {budget === 0
            ? "Add your budget"
            : isOverBudget
              ? "Budget Exceeded!"
              : isDanger
                ? "Almost out of budget!"
                : isWarning
                  ? "Watch your spending"
                  : "You're on track"}
        </p>
        <p className="text-2xl">
          {budget} - {total}
        </p>
      </div>

      {isOpen && (
        <div className="inset-0 bg-gray-400/40 absolute flex justify-center items-center max-h-full">
          <Form
            valueProp={details}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            closeModal={setIsOpen}
          />
        </div>
      )}

      <div className="sm:hidden w-full mt-15">
        <p className="mb-2 text-lg sm:text-xl font-semibold">Products Table</p>
        {items.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p className="text-center">Your cart is empty</p>
          </div>
        ) : (
          <div className=" grid grid-cols-2 w-full gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 shadow-sm flex flex-col"
              >
                <div className="font-medium truncate">{item.name}</div>
                <div className="text-sm text-gray-600">
                  Price: ₱{item.price}
                </div>
                <div className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </div>

                <button
                  className="mt-2 bg-[#F39B9A] text-white px-3 py-1 rounded hover:bg-amber-400 text-sm"
                  onClick={() => removeCartItem(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="hidden sm:table w-full mt-15">
        <p className="mb-2 sm:text-xl font-semibold">Products Table</p>
        <div className="w-full border rounded overflow-hidden">
          <table className="w-full table-fixed">
            <thead className="text-md sm:text-2xl">
              <tr className="border-b bg-gray-50">
                <th className="p-3 text-center">Product</th>
                <th className="p-3 text-center">Price</th>
                <th className="p-3 text-center">Quantity</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-20 text-gray-500">
                    Your cart is empty.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b last:border-0 hover:bg-gray-50 transition-colors text-sm"
                  >
                    <td className="p-3">
                      <div className="flex justify-center">
                        <span className="w-full max-w-[120px] text-center">
                          {item.name}
                        </span>
                      </div>
                    </td>

                    <td className="p-3 text-center">₱{item.price}</td>
                    <td className="p-3 text-center">{item.quantity}</td>

                    <td className="p-3 text-center">
                      <button
                        className="bg-[#F39B9A] text-white px-2 py-1 rounded hover:bg-amber-400 transition-colors text-sm"
                        onClick={() => removeCartItem(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
