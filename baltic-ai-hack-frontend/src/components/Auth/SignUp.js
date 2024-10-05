import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "student", // Default to student
  });

  const navigate = useNavigate();

  const { setUserType } = useUser();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setUserType(formData.userType);

    if (formData.userType === "student") {
      navigate("/student");
    } else if (formData.userType === "teacher") {
      navigate("/teacher");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">User Type</label>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
