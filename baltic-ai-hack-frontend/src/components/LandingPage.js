import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const LandingPage = () => {
  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center py-8">
      <Logo size="lg" />

      <h1 className="text-4xl font-bold text-gray-800 my-4">
        Welcome to EduAI Platform
      </h1>
      <p className="text-lg text-gray-600 mb-6 text-center max-w-2xl">
        A smart AI-driven platform that helps teachers and students achieve more
        through personalized learning experiences. Join us and start your
        journey!
      </p>

      <div className="flex space-x-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Log In
        </Link>
        <Link
          to="/signup"
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
