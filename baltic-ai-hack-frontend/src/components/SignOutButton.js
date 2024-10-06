import React from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const SignOutButton = () => {
  const { signOut } = useUser();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(); // Log out the user
    navigate("/login"); // Redirect to login page
  };

  return (
    <Button onClick={handleSignOut} color="danger">
      Sign Out
    </Button>
  );
};

export default SignOutButton;
