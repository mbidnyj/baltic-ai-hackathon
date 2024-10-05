import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "student",
  });

  const navigate = useNavigate();

  const { loginUser } = useUser();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(formData.userType); // Set the user role using `loginUser`
    navigate("/"); // Redirect after login
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
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
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
