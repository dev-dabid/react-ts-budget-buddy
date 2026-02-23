import type { ChangeEvent } from "react";

interface InputProps {
  type: string;
  inputName: string;
  inputValue: number | string;
  maxChar?: number;
  minNum?: number;
  maxNum?: number;
  inputHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  type,
  inputName,
  inputValue,
  maxChar,
  minNum,
  maxNum,
  inputHandler,
}: InputProps) => {
  return (
    <input
      className="border w-full rounded p-1.5"
      name={inputName}
      type={type}
      maxLength={maxChar}
      value={inputValue}
      min={minNum}
      max={maxNum}
      onChange={(e: ChangeEvent<HTMLInputElement>) => inputHandler(e)}
    />
  );
};

export default Input;
