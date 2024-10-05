import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import TeacherDashboard from "./components/TeacherDashboard";
import ModulePreview from "./components/ModulePreview";
import EditModule from "./components/EditModule"; // Import the new EditModule component
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import LandingPage from "./components/LandingPage";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route index element={<LandingPage />} />
            <Route path="/teacher" element={<TeacherDashboard />} />
            <Route
              path="/module/:moduleId/preview"
              element={<ModulePreview />}
            />
            <Route path="/module/:moduleId/edit" element={<EditModule />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
