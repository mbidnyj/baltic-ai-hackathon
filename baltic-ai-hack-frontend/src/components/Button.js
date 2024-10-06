import React from "react";

const Button = ({ children, onClick, color = "default" }) => {
  const colors = {
    default: "bg-blue-600 hover:bg-blue-700 text-white",
    danger: "bg-red-500 hover:bg-red-700 text-white",
  };

  return (
    <button
      className={colors[color] + " px-6 py-2 rounded w-fit font-bold"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
