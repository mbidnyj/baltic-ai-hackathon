import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import TeacherDashboard from "./components/TeacherDashboard";
import ModulePreview from "./components/ModulePreview";
import EditModule from "./components/EditModule"; // Import the new EditModule component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="/module/:moduleId/preview" element={<ModulePreview />} />
          <Route path="/module/:moduleId/edit" element={<EditModule />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
