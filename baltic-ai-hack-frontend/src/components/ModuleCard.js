import React from 'react';
import PropTypes from 'prop-types';

const ModuleCard = ({ title, subject, description, questions, grade, students }) => {
  return (
    <div className="flex flex-col bg-white border border-solid shadow-sm rounded-xl">
      {/* Optional Image Section - You can remove this line if you don't need an image */}
      <img
        className="w-full h-auto rounded-t-xl"
        src="https://via.placeholder.com/320"
        alt="Module Image"
      />
      <div className="p-4 md:p-5">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="mt-1 text-sm font-semibold text-gray-500 uppercase">{subject}</p>
        <p className="mt-3 text-gray-700">{description}</p>
        <div className="flex items-center mt-4 space-x-2.5">
          <span className="text-sm text-gray-600">{questions}</span>
          <span className="text-sm text-gray-600">{grade}</span>
        </div>
        <p className="mt-4 text-sm text-gray-600">Enrolled students: {students}</p>
        <div className="flex gap-2.5 mt-4">
          <button className="py-3.5 px-4 inline-flex justify-center items-center gap-x-2.5 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 transition-all">
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
  title: PropTypes.string.isRequired,
  subject: PropTypes.oneOf(['SCIENCE', 'MATH', 'BIOLOGY', 'ENGLISH', 'HISTORY']).isRequired,
  description: PropTypes.string.isRequired,
  questions: PropTypes.string.isRequired,
  grade: PropTypes.oneOf([4, 5, 6, 7, 8, 9]).isRequired,
  students: PropTypes.number.isRequired,
};

export default ModuleCard;