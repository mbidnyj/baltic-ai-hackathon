import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import { useUser } from "../context/UserContext";
import TeacherDashboard from "./TeacherDashboard";
import StudentDashboard from "./StudentDashboard";

const Layout = () => {
  const { userType } = useUser();
  const location = useLocation();

  let content;
  if (userType === "teacher") {
    content = <TeacherDashboard />; // Show teacher dashboard if logged in as teacher
  } else if (userType === "student") {
    content = <StudentDashboard />; // Show student dashboard if logged in as student
  } else if (
    location.pathname === "/login" ||
    location.pathname === "/signup"
  ) {
    content = <Outlet />; // Render Login/Signup forms
  } else {
    content = <Outlet />; // Fallback to nested routes or landing page by default
  }

  return (
    <div>
      <Header />

      <main className="px-8 py-12 bg-gray-50 min-h-screen">{content}</main>
    </div>
  );
};

export default Layout;
