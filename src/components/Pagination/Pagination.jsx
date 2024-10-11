import React from "react";
import { ArrowleftSvg, ArrowRightSvg } from "../../images/SVGAssets";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);
  return (
    <div className="flex justify-between items-center">
      <button
        onClick={() => setCurrentPage((prev) => prev - 1)}
        disabled={currentPage === 1}
        className="flex items-center p-2 gap-2 cursor-pointer"
      >
        <ArrowleftSvg />
        <p className="font-montserrat text-sm text-customColorName font-medium hover:text-customBlue">
          Previous
        </p>
      </button>
      <div className="flex gap-2">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`flex items-center justify-center h-8 w-8 rounded-full ${
              currentPage === number
                ? "bg-customBorder text-customBlue"
                : "bg-white text-customText"
            }`}
          >
            {number}
          </button>
        ))}
      </div>

      <button
        onClick={() => setCurrentPage((prev) => prev + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center p-2 gap-2 cursor-pointer"
      >
        <p className="font-montserrat text-sm text-customColorName font-medium hover:text-customBlue">
          Next
        </p>
        <ArrowRightSvg />
      </button>
    </div>
  );
};

export default Pagination;
