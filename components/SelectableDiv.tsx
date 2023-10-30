
import React, { useRef } from "react";

interface SelectProps {
  text: any;
  handleInputChange: any;

}

const SelectContainer: React.FC<SelectProps> = ({ text, handleInputChange }) => {
  const selectRef = useRef<HTMLSelectElement>(null);

 

  return (
    <div className="border bg-white border-[#ABABAB] rounded-xl ">
      <select
        ref={selectRef}
        name={text.title}
        className={`w-full bg-white border-black p-4 rounded-xl`}
        style={{ color: "#121212" }}
        onChange={handleInputChange}
      >
        <option>
          <span className="text-dark/60">{text.placeHolder}</span>
        </option>
        {text.iterable?.map((it: any, i: number) => (
          <option key={i} value={it}>
            {it}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectContainer;
