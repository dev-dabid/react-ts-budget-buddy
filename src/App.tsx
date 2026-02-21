import type { ChangeEvent } from "react";
import type { GroceryItem } from "./types/index";
import { useStore } from "./store/store";
import { useState } from "react";
import Form from "./components/Form";
import Button from "./components/Button";
import bblogo from "./assets/budget-buddy-logo.svg";

const App = () => {
  //STATES
  const budget = useStore((state) => state.budget);
  const items = useStore((state) => state.items);

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
    const name = e.target.name;
    const value = e.target.value;

    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = () => {
    setCart({ ...details, id: Date.now().toString() });
    setDetails({ id: "", name: "", price: 0, quantity: 1 });
  };

  const updateBudget = items.reduce(
    (t, item) => t + item.price * item.quantity,
    0,
  );

  const totalPriceProducts = items.reduce(
    (t, item) => t + item.price * item.quantity,
    0,
  );

  const subtractBudget = budget - updateBudget;

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
        <Button />
      </div>

      <div className="text-center mt-15">
        <p className="text-lg sm:text-2xl">Budget {`(-)`} minus Products</p>
        <p className="text-5xl sm:text-7xl text-[#F39B9A]">
          {budget && subtractBudget}
        </p>
        <p className="text-2xl">
          {budget} - {totalPriceProducts}
        </p>
      </div>

      <div>
        {isOpen && (
          <Form
            valueProp={details}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}
      </div>

      <div className="w-full mt-15 ">
        <p className="mb-2 sm: text-xl">Products Table</p>
        <div className="w-full border rounded">
          <table className="w-full text-start">
            <tr className="border-b">
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
            {items.map((item) => {
              return (
                <tr className="text-center">
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>
                    {
                      <button
                        className="bg-amber-300"
                        onClick={() => removeCartItem(item.id)}
                      >
                        remove
                      </button>
                    }
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
