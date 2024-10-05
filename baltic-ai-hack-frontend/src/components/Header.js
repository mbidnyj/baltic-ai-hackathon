import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Header = () => {
  const { userType } = useUser();

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center space-x-8">
      <Logo />

      {userType === "guest" && (
        <nav className="flex-1 flex items-center justify-end space-x-8">
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
          <Link to="/signup" className="text-blue-600">
            Sign Up
          </Link>
        </nav>
      )}

      {userType === "teacher" && (
        <>
          <nav className="flex-1 flex justify-center items-center space-x-8">
            <Link to="#" className="hover:text-gray-700">
              Create Module +
            </Link>
            <Link to="#" className="hover:text-gray-700">
              Student Performance
            </Link>
            <Link to="#" className="hover:text-gray-700">
              Notifications
            </Link>
          </nav>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <img
                src="/teacher-avatar.png"
                alt="Teacher Avatar"
                className="h-10 w-10 rounded-full"
              />
              <div>
                <Link to="/profile" className="font-medium text-gray-900">
                  Mark Williams
                </Link>
                <p className="text-sm text-gray-500">Teacher</p>
              </div>
            </div>
          </div>
        </>
      )}

      {userType === "student" && (
        <>
          <nav className="flex-1 flex items-center justify-end space-x-8">
            <Link to="/" className="text-blue-600 hover:text-blue-800">
              Dashboard
            </Link>
            <Link to="#" className="hover:text-gray-700">
              Assignments
            </Link>
            <Link to="#" className="hover:text-gray-700">
              Progress
            </Link>
            <Link to="#" className="hover:text-gray-700">
              Notifications
            </Link>
          </nav>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <img
                src="/student-avatar.png"
                alt="Student Avatar"
                className="h-10 w-10 rounded-full"
              />
              <div>
                <Link to="/profile" className="font-medium text-gray-900">
                  Dave Student
                </Link>
                <p className="text-sm text-gray-500">Student</p>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
