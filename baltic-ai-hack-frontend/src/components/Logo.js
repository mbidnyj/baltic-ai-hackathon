import React from "react";

const Logo = ({ size = "md" }) => {
  let sizes = {
    sm: "w-18",
    md: "w-24",
    lg: "w-30",
  };

  return (
    <a href="/">
      <img className={sizes[size]} src="/logo-with-text.png" />
    </a>
  );
};

export default Logo;
