import type { ChangeEvent, SubmitEvent } from "react";
import type { GroceryItem } from "../types";
import Input from "./Input";

interface InputProps {
  valueProp: GroceryItem;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
}

const Form = ({ valueProp, handleChange, handleSubmit }: InputProps) => {
  const { name, price, quantity } = valueProp;

  return (
    <form
      onSubmit={(e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Input inputName={"name"} inputValue={name} inputHandler={handleChange} />
      <Input
        inputName={"price"}
        inputValue={price}
        inputHandler={handleChange}
      />
      <Input
        inputName={"quantity"}
        inputValue={quantity}
        inputHandler={handleChange}
      />
      <button>submit</button>
    </form>
  );
};

export default Form;
