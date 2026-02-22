import type { ChangeEvent } from "react";

interface InputProps {
  inputName: string;
  inputValue: number | string;
  inputHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ inputName, inputValue, inputHandler }: InputProps) => {
  return (
    <input
      className="border w-full rounded p-1.5"
      name={inputName}
      type="text"
      value={inputValue}
      onChange={(e: ChangeEvent<HTMLInputElement>) => inputHandler(e)}
    />
  );
};

export default Input;
