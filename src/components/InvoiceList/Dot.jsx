import React from "react";

const GreenDot = ({ color }) => {
  let bgColor;

  switch (color) {
    case "Paid":
      bgColor = "bg-customGreen";
      break;
    case "Refunded":
      bgColor = "bg-customBlack";
      break;
    case "Cancelled":
      bgColor = "bg-customRed";
      break;
  }
  return <div className={`w-2 h-2 rounded-full ${bgColor}`} />;
};

export default GreenDot;
