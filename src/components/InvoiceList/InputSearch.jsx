import React from "react";
import { SearchSVG } from "../../images/SVGAssets";

const InputSearch = ({setSerchInovice, serchInovice}) => {
  return (
    <div>
      <label
        className="text-customGray font-montserrat text-sm font-medium leading-5 mb-2 block"
        htmlFor="search"
      >
        Search for order
      </label>
      <div className="flex items-center gap-2 border border-gray-300 py-2.5 px-3.5 rounded-lg">
        <SearchSVG />
        <input
          type="text"
          className="w-full focus:outline-none text-base placeholder:font-montserrat placeholder:text-base placeholder:leading-6"
          id="search"
          placeholder="Search"
          value={serchInovice}
          onChange={(e) => setSerchInovice(e.target.value)}
        />
      </div>
    </div>
  );
};

export default InputSearch;
