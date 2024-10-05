import React from 'react';
import ModuleCard from './ModuleCard'; // Import MyComponent

const TeacherDashboard = () => {
  return (
    <div className="px-8 py-12 bg-gray-50 min-h-screen">
      {/* Modules Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">My modules</h2>
          <button className="px-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-md">
            Create module +
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Render Module Cards */}
          <ModuleCard />
          <ModuleCard />
        </div>
      </div>

      {/* Statistics Section (Placeholder) */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Statistics</h2>
        <p className="text-lg text-gray-500">Statistics content will go here...</p>
      </div>
    </div>
  );
};

export default TeacherDashboard;
