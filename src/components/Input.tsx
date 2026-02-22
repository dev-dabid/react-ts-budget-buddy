import type { ChangeEvent } from "react";

interface InputProps {
  inputName: string;
  inputValue: number | string;
  max?: number;
  inputHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ inputName, inputValue, max, inputHandler }: InputProps) => {
  return (
    <input
      className="border w-full rounded p-1.5"
      name={inputName}
      type="text"
      maxLength={max}
      value={inputValue}
      onChange={(e: ChangeEvent<HTMLInputElement>) => inputHandler(e)}
    />
  );
};

export default Input;
