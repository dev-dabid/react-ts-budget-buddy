import type { ChangeEvent } from "react";
import type { GroceryItem } from "./types/index";
import { useStore } from "./store/store";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  calculateTotal,
  getRemainingBudget,
  checkOverBudget,
} from "./helpers/budgetCalculations";

import Form from "./components/Form";
import Button from "./components/Button";
import bblogo from "./assets/budget-buddy-logo.svg";

const App = () => {
  const budget = useStore((state) => state.budget);
  const items = useStore((state) => state.items);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = calculateTotal(items);
  const remaining = getRemainingBudget(budget, total);
  const isOverBudget = checkOverBudget(budget, total, 100);
  const isDanger = checkOverBudget(budget, total, 80);
  const isWarning = checkOverBudget(budget, total, 50);

  const setBudget = useStore((state) => state.setBudget);
  const setCart = useStore((state) => state.setCart);
  const removeCartItem = useStore((state) => state.removeCartItem);

  const [details, setDetails] = useState<GroceryItem>({
    id: Date.now().toString(),
    name: "",
    price: 0,
    quantity: 1,
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useGSAP(
    () => {
      gsap.from(".entry-animate", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });
    },
    { scope: containerRef },
  );

  useGSAP(() => {
    if (remaining !== budget) {
      gsap.to(".total-num", {
        scale: 1.1,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut",
      });
    }
  }, [remaining]);

  useGSAP(() => {
    if (items.length > 0) {
      gsap.from(".product-card", {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });
    }
  }, [items.length]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setDetails((prev) => {
      if (type === "number") {
        let num = value === "" ? "" : Number(value);
        if (typeof num === "number") {
          if (num < 0) num = 0;
          if (name === "quantity" && num > 999) num = 999;
          if (name === "price" && num > 999999) num = 999999;
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
    <div
      ref={containerRef}
      className="flex justify-center flex-col items-center itim-regular p-2 max-w-300 mx-auto"
    >
      <img src={bblogo} alt="Logo" className="entry-animate" />

      <div className="flex items-end mt-10 w-full entry-animate">
        <p className="text-3xl sm:text-7xl">Budget:</p>
        <div className="border-b-2 w-full border-[#F39B9A]">
          <input
            className="outline-none text-2xl sm:text-5xl pl-5 w-full bg-transparent"
            type=""
            value={budget}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setBudget(Number(e.target.value))
            }
          />
        </div>
      </div>

      <div className="flex justify-start w-full mt-13 entry-animate">
        <Button clickEvent={setIsOpen} />
      </div>

      <div className="text-center mt-15 entry-animate">
        <p className="text-lg sm:text-2xl">Budget (-) minus Products</p>
        <p
          className={`total-num text-5xl sm:text-7xl font-bold ${budget === 0 ? "text-gray-500" : isOverBudget ? "text-red-700" : isDanger ? "text-red-500" : isWarning ? "text-yellow-500" : "text-[#F39B9A]"}`}
        >
          {remaining}
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
        <p className="text-2xl opacity-70">
          {budget} - {total}
        </p>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <Form
            valueProp={details}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            closeModal={setIsOpen}
          />
        </div>
      )}

      <div className="sm:hidden w-full mt-15">
        <p className="mb-4 text-lg font-semibold">Products Table</p>
        {items.length === 0 ? (
          <p className="text-center py-10 text-gray-400">Your cart is empty</p>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="product-card border rounded-xl p-4 shadow-sm bg-white flex flex-col"
              >
                <div className="font-bold truncate text-[#F39B9A]">
                  {item.name}
                </div>
                <div className="text-sm text-gray-500">
                  ₱{item.price} x {item.quantity}
                </div>
                <button
                  className="mt-3 bg-[#F39B9A]/10 text-[#F39B9A] border border-[#F39B9A]/20 py-1 rounded-lg text-sm font-medium active:scale-95 transition-transform"
                  onClick={() => removeCartItem(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="hidden sm:block w-full mt-15">
        <p className="mb-4 text-xl font-semibold">Products Table</p>
        <div className="w-full border rounded-2xl overflow-hidden bg-white shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-center">Product</th>
                <th className="p-4 text-center">Price</th>
                <th className="p-4 text-center">Quantity</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-20 text-gray-400">
                    Your cart is empty.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 text-center">{item.name}</td>
                    <td className="p-4 text-center">{item.price}</td>
                    <td className="p-4 text-center">{item.quantity}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => removeCartItem(item.id)}
                        className="text-red-400 hover:text-red-600 font-medium"
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
