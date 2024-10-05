import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import VisibilityIcon from '@mui/icons-material/Visibility'; // Material Icon for visibility
import QuizIcon from '@mui/icons-material/Quiz'; // Icon for questions
import SchoolIcon from '@mui/icons-material/School'; // Icon for grade

const ModuleCard = ({ moduleId, title, subject, description, questions, grade, students }) => {
  const navigate = useNavigate(); // Use the hook for navigation

  // Handle preview button click
  const handlePreviewClick = () => {
    navigate(`/module/${moduleId}/preview`);
  };

  return (
    <div className="flex flex-col bg-white border border-solid shadow-sm rounded-xl min-h-[250px] relative">
      {/* Eye Icon */}
      <div className="absolute top-4 right-4">
        <button onClick={handlePreviewClick} className="text-gray-500 hover:text-gray-700">
          <VisibilityIcon className="w-5 h-5" /> {/* Material Icon for eye */}
        </button>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5 flex flex-col h-full justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <p className="mt-1 text-sm font-semibold text-gray-500 uppercase">{subject}</p>
          <p className="mt-3 text-gray-700 flex-grow">{description}</p>
        </div>

        {/* Pills for Questions and Grade */}
        <div className="flex items-center mt-4 space-x-2.5">
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-800 border border-gray-200 rounded-lg">
            <QuizIcon className="w-4 h-4 mr-1" /> {questions} Questions
          </span>
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-800 border border-gray-200 rounded-lg">
            <SchoolIcon className="w-4 h-4 mr-1" /> {grade}th Grade
          </span>
        </div>

        {/* Students Count */}
        <p className="mt-4 text-sm text-gray-600">Enrolled students: {students}</p>

        {/* Buttons */}
        <div className="flex gap-2.5 mt-4">
          <button className="py-2 px-4 inline-flex justify-center items-center gap-x-2.5 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 transition-all">
            Assign module
          </button>
          <button className="py-3.5 px-4 inline-flex justify-center items-center gap-x-2.5 text-sm font-semibold rounded-lg border border-gray-300 bg-gray-100 text-gray-900 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 transition-all">
            Edit module
          </button>
        </div>
      </div>
    </div>
  );
};

ModuleCard.propTypes = {
  moduleId: PropTypes.string.isRequired, // Unique module ID to be passed
  title: PropTypes.string.isRequired,
  subject: PropTypes.oneOf(['SCIENCE', 'MATH', 'BIOLOGY', 'ENGLISH', 'HISTORY']).isRequired,
  description: PropTypes.string.isRequired,
  questions: PropTypes.string.isRequired,
  grade: PropTypes.oneOf([4, 5, 6, 7, 8, 9]).isRequired,
  students: PropTypes.number.isRequired,
};

export default ModuleCard;
