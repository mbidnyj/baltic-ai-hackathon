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

  // Only show dashboards on the home route "/"
  if (location.pathname === "/") {
    if (userType === "teacher") {
      content = <TeacherDashboard />; // Teacher dashboard if logged in as teacher
    } else if (userType === "student") {
      content = <StudentDashboard />; // Student dashboard if logged in as student
    } else {
      content = <Outlet />; // Landing page or fallback for guests
    }
  } else {
    // Render child routes (like profile, module, etc.) for other routes
    content = <Outlet />;
  }

  return (
    <div>
      <Header /> {/* Common Header for all pages */}
      <main className="px-8 py-12 bg-gray-50 min-h-screen">{content}</main>
    </div>
  );
};

export default Layout;
