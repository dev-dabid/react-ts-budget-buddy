import type { ChangeEvent } from "react";
import type { GroceryItem } from "./types/index";
import { useStore } from "./store/store";
import { useState } from "react";
import Form from "./components/Form";

const App = () => {
  //STATES
  const items = useStore((state) => state.items);
  const budget = useStore((state) => state.budget);

  //ACTIONS
  const setBudget = useStore((state) => state.setBudget);
  const setCart = useStore((state) => state.setCart);

  //LOCAL STATES
  const [details, setDetails] = useState<GroceryItem>({
    id: Date.now().toString(),
    name: "",
    price: 0,
    quantity: 1,
  });

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

  console.log(items);

  return (
    <div>
      <input
        type="text"
        value={budget}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setBudget(Number(e.target.value))
        }
      />
      <div>
        <Form
          valueProp={details}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default App;
