import type { Dispatch, SetStateAction } from "react";

interface Setter {
  clickEvent: Dispatch<SetStateAction<boolean>>;
}

const Button = ({ clickEvent }: Setter) => {
  return (
    <button
      className="bg-white rounded-[5px] px-2.5 pt-2.5 shadow-[5px_4px_0px] shadow-gray-400 border border-[#F39B9A] active:translate-y-2 hover:shadow-[7px_6px_0px] active:shadow-[3px_2px_0px]"
      onClick={() => clickEvent((prev) => !prev)}
    >
      <p className="text-lg">
        <span className="font-bold text-2xl">+</span> Add Products
      </p>
    </button>
  );
};

export default Button;
