import React, { useState, useEffect } from 'react';
import ModuleCard from './ModuleCard';
import AddModuleModal from './AddModuleModal';
import AddIcon from '@mui/icons-material/Add';

const TeacherDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Log to confirm the component is rendering
  console.log('TeacherDashboard component rendered');

  useEffect(() => {
    console.log('Fetching modules...'); // Add this log

    const fetchModules = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/modules');
        if (!response.ok) {
          throw new Error('Failed to fetch modules');
        }
        const data = await response.json();
        console.log('Modules fetched:', data); // Log the data

        setModules(data);
        setLoading(false);
      } catch (err) {
        console.error('Error:', err.message); // Add this log
        setError(err.message);
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

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

        {/* Loading State */}
        {loading && <p>Loading modules...</p>}

        {/* Error State */}
        {error && <p className="text-red-500">Error: {error}</p>}

        {/* Render Module Cards */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module) => (
              <ModuleCard
                key={module.moduleId}
                moduleId={module.moduleId}
                title={module.title}
                subject={module.subject}
                description={module.description}
                questions={module.questions}
                grade={module.grade}
                students={module.students}
              />
            ))}
          </div>
        )}
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
