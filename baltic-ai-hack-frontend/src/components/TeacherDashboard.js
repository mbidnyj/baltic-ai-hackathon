import React, { useState } from 'react';
import ModuleCard from './ModuleCard';
import AddModuleModal from './AddModuleModal';

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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">My modules</h2>
          <button
            onClick={openModal}
            className="px-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-md"
          >
            Add module
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Render Module Cards */}
          <ModuleCard
            title="Module Title"
            subject="PHYSICS"
            description="Learn everything about the most famous man to be hit on the head with an apple."
            questions="15 Questions"
            grade="8th Grade"
            students="48"
          />
          <ModuleCard
            title="Module Title"
            subject="SUBJECT"
            description="This is just some filler description of the study module."
            questions="15 Questions"
            grade="4th Grade"
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
