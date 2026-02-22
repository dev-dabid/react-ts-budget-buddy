import type { ChangeEvent } from "react";

interface InputProps {
  type: string;
  inputName: string;
  inputValue: number | string;
  max?: number;
  inputHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  type,
  inputName,
  inputValue,
  max,
  inputHandler,
}: InputProps) => {
  return (
    <input
      className="border w-full rounded p-1.5"
      name={inputName}
      type={type}
      maxLength={max}
      value={inputValue}
      onChange={(e: ChangeEvent<HTMLInputElement>) => inputHandler(e)}
    />
  );
};

export default Input;
