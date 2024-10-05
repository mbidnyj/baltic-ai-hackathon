import React from 'react';
import Header from './components/Header';
import TeacherDashboard from './components/TeacherDashboard';
function App() {
  return (
    <div>
      {/* Always show Header for teacher */}
      <Header userType="teacher" />
      <TeacherDashboard />
    </div>
  );
}

export default App;
