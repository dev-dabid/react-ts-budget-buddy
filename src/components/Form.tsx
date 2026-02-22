import type { ChangeEvent, Dispatch, SetStateAction, SubmitEvent } from "react";
import type { GroceryItem } from "../types";
import Input from "./Input";
import { TiBackspaceOutline } from "react-icons/ti";

interface InputProps {
  valueProp: GroceryItem;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  closeModal: Dispatch<SetStateAction<boolean>>;
}

const Form = ({
  valueProp,
  handleChange,
  handleSubmit,
  closeModal,
}: InputProps) => {
  const { name, price, quantity } = valueProp;

  return (
    <div className="bg-white max-w-75 w-full p-6 border rounded">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl border-b-2 border-[#F39B9A]">Add Product</h1>
        <button
          className="bg-[#F39B9A] text-white p-1.5 rounded-3xl hover:bg-white hover:text-[#F39B9A]"
          onClick={() => closeModal((prev) => !prev)}
        >
          <TiBackspaceOutline size={20} />
        </button>
      </div>

      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={(e: SubmitEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleSubmit();
          closeModal((prev) => !prev);
        }}
      >
        <div>
          <p className="truncate wrap-break-word">Product Name</p>
          <Input
            inputName={"name"}
            inputValue={name}
            inputHandler={handleChange}
          />
        </div>

        <div>
          <p>Price</p>
          <Input
            inputName={"price"}
            inputValue={price}
            inputHandler={handleChange}
          />
        </div>

        <div>
          <p>Quantity</p>
          <Input
            inputName={"quantity"}
            inputValue={quantity}
            inputHandler={handleChange}
          />
        </div>

        <div className="flex justify-center mt-3">
          <button className="border py-2 px-3 rounded text-lg border-[#F39B9A] shadow-[5px_4px_0px] shadow-gray-400 active:-translate-y-1 hover:shadow-[2px_3px_0px]">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
