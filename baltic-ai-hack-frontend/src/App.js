import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TeacherDashboard from './components/TeacherDashboard';
import ModulePreview from './components/ModulePreview';
import Layout from './components/Layout'; // Import the Layout component

function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap all routes in Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="module/:moduleId/preview" element={<ModulePreview />} />
          {/* Add other routes here as needed */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
