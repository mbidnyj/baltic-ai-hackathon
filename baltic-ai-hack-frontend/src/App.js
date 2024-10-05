import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TeacherDashboard from './components/TeacherDashboard';
import ModulePreview from './components/ModulePreview';
import EditModule from './components/EditModule'; // Import the new EditModule component
import Layout from './components/Layout';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<TeacherDashboard />} />
          <Route path="/module/:moduleId/preview" element={<ModulePreview />} />
          <Route path="/module/:moduleId/edit" element={<EditModule />} /> {/* New Edit route */}
        </Routes>
    </Router>
  );
}

export default App;
