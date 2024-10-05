import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const Header = ({ userType = "teacher" }) => {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center space-x-8">
      <Logo />

      {/* Navigation Section */}
      <nav className="flex-1 flex justify-center items-center space-x-8">
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          Dashboard
        </Link>
        <Link to="#" className="hover:text-gray-700">
          Create Module +
        </Link>
        {userType === "teacher" && (
          <Link to="#" className="hover:text-gray-700">
            Student Performance
          </Link>
        )}
        {userType === "student" && (
          <Link to="#" className="hover:text-gray-700">
            Self-evaluation
          </Link>
        )}
        {userType === "student" && (
          <Link to="#" className="hover:text-gray-700">
            Progress
          </Link>
        )}
        <Link to="#" className="hover:text-gray-700">
          Notifications
        </Link>
      </nav>

      {/* User Section */}
      <div className="flex items-center space-x-6">
        {userType === "guest" && (
          <>
            <button className="px-4 py-2 text-gray-800 border rounded-md hover:bg-gray-100">
              Log in
            </button>
            <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Sign up
            </button>
          </>
        )}
        {(userType === "teacher" || userType === "student") && (
          <div className="flex items-center space-x-4">
            <img
              src={
                userType === "teacher"
                  ? "/teacher-avatar.png"
                  : "/student-avatar.png"
              }
              alt={userType === "teacher" ? "Teacher Avatar" : "Student Avatar"}
              className="h-10 w-10 rounded-full"
            />
            <div>
              <Link to="/profile" className="font-medium text-gray-900">
                {userType === "teacher" ? "Mark Williams" : "Dave Student"}
              </Link>
              <p className="text-sm text-gray-500">
                {userType === "teacher" ? "Teacher" : "Student"}
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
