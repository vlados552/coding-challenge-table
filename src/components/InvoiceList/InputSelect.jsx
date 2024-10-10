import React from "react";
import Dot from "./Dot";

const InputSelect = ({ label, selectedOption, onChange, options }) => {
  const showClearOption = selectedOption !== "";
  return (
    <div>
      <label className="mb-2 text-customGray font-montserrat text-sm font-medium leading-5 block">
        {label}
      </label>
      <div className="flex items-center gap-2 border border-gray-300 py-2.5 px-3.5 rounded-lg">
        {label === "Status" ? <Dot color={selectedOption} /> : null}
        <select
          className="w-full focus:outline-none bg-transparent text-base cursor-pointer"
          value={selectedOption}
          onChange={onChange}
        >
          <option value="" disabled hidden/>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}

          {showClearOption && <option value="">Clear all</option>}
        </select>
      </div>
    </div>
  );
};

export default InputSelect;
