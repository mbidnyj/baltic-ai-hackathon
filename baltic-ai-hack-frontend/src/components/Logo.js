import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ size = "md" }) => {
  let sizes = {
    sm: "w-18",
    md: "w-24",
    lg: "w-30",
  };

  return (
    <Link to="/">
      <img className={sizes[size]} src="/logo-with-text.png" />
    </Link>
  );
};

export default Logo;
