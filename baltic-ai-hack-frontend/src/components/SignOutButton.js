import React from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const { signOut } = useUser();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(); // Log out the user
    navigate("/login"); // Redirect to login page
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
