import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TeacherDashboard from './components/TeacherDashboard';
import ModulePreview from './components/ModulePreview';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TeacherDashboard />} />
        <Route path="/module/:moduleId/preview" element={<ModulePreview />} />
      </Routes>
    </Router>
  );
}

export default App;
