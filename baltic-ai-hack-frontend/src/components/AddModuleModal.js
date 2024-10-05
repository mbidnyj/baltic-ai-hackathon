import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'; // Make sure to install axios via `npm install axios`

const AddModuleModal = ({ isOpen, onClose }) => {
  const [quizTitle, setQuizTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [questionCount, setQuestionCount] = useState('Automatic');
  const [questionType, setQuestionType] = useState('MULTIPLE_CHOICE');

  if (!isOpen) return null;

  const handleGenerateQuiz = async () => {
    try {
      const requestData = {
        title: quizTitle,
        description,
        subject,
        grade,
        questionCount,
        questionType,
      };

      const response = await axios.post('http://localhost:8080/api/module', requestData);
      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error generating quiz:', error);
    }
  };

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
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <textarea
            placeholder="Short Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <div className="w-full h-32 border-dashed border-2 border-gray-300 flex items-center justify-center rounded-md">
            <span className="text-gray-400">Drop your study materials here or <a href="#" className="text-blue-600 hover:underline">browse</a></span>
          </div>
          <div className="flex space-x-4">
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Subject</option>
              <option value="SCIENCE">SCIENCE</option>
              <option value="MATH">MATH</option>
              <option value="BIOLOGY">BIOLOGY</option>
              <option value="ENGLISH">ENGLISH</option>
              <option value="HISTORY">HISTORY</option>
            </select>
            <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-1/2 px-2 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Grade</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
          </div>
          <div className="flex justify-between items-center">
            <span className="question-label">Number of questions:</span>
            <div className="pills-container space-x-1">
              {['Automatic', '5', '8', '10', '15'].map((count) => (
                <button
                  key={count}
                  onClick={() => setQuestionCount(count)}
                  className={`text-xs px-3 py-1 border border-gray-300 rounded-full focus:outline-none ${
                    questionCount === count ? 'bg-blue-500 text-white' : ''
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="mb-2">Question Type</label>
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="MULTIPLE_CHOICE">Multiple Choice</option>
              <option value="OPEN_ANSWER">Open Answer</option>
            </select>
          </div>
          <button
            onClick={handleGenerateQuiz}
            className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all"
          >
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
