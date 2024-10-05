import React, { createContext, useState, useContext } from "react";

// Create UserContext
const UserContext = createContext();

// Create a custom hook to access the context
export const useUser = () => useContext(UserContext);

// Create a provider component
export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState("guest");

  return (
    <UserContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserContext.Provider>
  );
};
