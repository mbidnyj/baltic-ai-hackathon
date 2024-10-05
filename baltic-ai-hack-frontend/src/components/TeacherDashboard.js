import React, { useState } from 'react';
import ModuleCard from './ModuleCard';
import AddModuleModal from './AddModuleModal';
import AddIcon from '@mui/icons-material/Add'; // Material Icon for "Add"

const TeacherDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="px-8 py-12 bg-gray-50 min-h-screen">
      {/* Modules Section */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mr-4">My modules</h2>
          <button
            onClick={openModal}
            className="py-2 px-4 inline-flex justify-center items-center gap-x-2.5 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 transition-all"
          >
            <AddIcon className="w-5 h-5" /> Add module
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Render Module Cards */}
          <ModuleCard
            moduleId="1" // Unique module ID
            title="Module Title"
            subject="PHYSICS"
            description="Learn everything about the most famous man to be hit on the head with an apple."
            questions="15"
            grade="8"
            students="48"
          />
          <ModuleCard
            moduleId="2" // Unique module ID
            title="Module Title"
            subject="HISTORY"
            description="This is just some filler description of the study module."
            questions="10"
            grade="4"
            students="7"
          />
        </div>
      </div>

      {/* Statistics Section (Placeholder) */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Statistics</h2>
        <p className="text-lg text-gray-500">Statistics content will go here...</p>
      </div>

      {/* Add Module Modal */}
      <AddModuleModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default TeacherDashboard;
