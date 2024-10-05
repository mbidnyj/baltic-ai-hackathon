import React from 'react';
import PropTypes from 'prop-types';

const AddModuleModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Generate a quiz from study materials</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Simply upload the study materials as a document, set some parameters and let our AI do the work. Kick back and relax! 🌴
        </p>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Quiz Title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <textarea
            placeholder="Short Description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <div className="w-full h-32 border-dashed border-2 border-gray-300 flex items-center justify-center rounded-md">
            <span className="text-gray-400">Drop your study materials here or <a href="#" className="text-blue-600 hover:underline">browse</a></span>
          </div>
          <div className="flex space-x-4">
            <select className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
              <option value="" disabled selected>Subject</option>
              <option value="SCIENCE">SCIENCE</option>
              <option value="MATH">MATH</option>
              <option value="BIOLOGY">BIOLOGY</option>
              <option value="ENGLISH">ENGLISH</option>
              <option value="HISTORY">HISTORY</option>
            </select>
            <select className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
              <option value="" disabled selected>Grade</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
          </div>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <label>Number of questions:</label>
              <button className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none">Automatic</button>
              <button className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none">5</button>
              <button className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none">8</button>
              <button className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none">10</button>
              <button className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none">15</button>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="mb-2">Question Type</label>
            <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
              <option value="MULTIPLE_CHOICE">Multiple Choice</option>
              <option value="OPEN_ANSWER">Open Answer</option>
            </select>
          </div>
          <button className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all">
            Generate quiz
          </button>
        </div>
      </div>
    </div>
  );
};

AddModuleModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddModuleModal;
