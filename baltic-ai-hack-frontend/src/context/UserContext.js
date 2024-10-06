import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState("guest"); // `setUserType` is defined here
  const [quizView, setQuizView] = useState("quiz");

  // Function to log in the user and set the userType
  const loginUser = (type) => {
    setUserType(type); // Set userType to either 'teacher' or 'student'
  };

  // Function to log out the user and reset the userType
  const signOut = () => {
    setUserType("guest"); // Reset userType to null
  };

  return (
    <UserContext.Provider
      value={{
        userType,
        setUserType,
        loginUser,
        signOut,
        quizView,
        setQuizView,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};
