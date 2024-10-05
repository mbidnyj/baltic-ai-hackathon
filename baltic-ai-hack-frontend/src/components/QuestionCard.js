import React, { useState } from 'react';
import PropTypes from 'prop-types';

const QuestionCard = ({ question, options, hint, currentIndex, totalQuestions }) => {
  const [selectedOption, setSelectedOption] = useState(null); // Track selected option
  const [showHint, setShowHint] = useState(false); // Track whether the hint is displayed

  return (
    <div className="p-4 mb-4 border rounded-lg shadow-sm bg-white">
      {/* Question and navigation */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">{question}</h3>
        <span className="text-gray-400 text-sm">{`${currentIndex}/${totalQuestions}`}</span>
      </div>

      {/* Answer options */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedOption(option)} // Select the clicked option
            className={`block w-full text-center p-2 border rounded-lg ${
              selectedOption === option ? 'bg-blue-100 border-blue-500' : 'bg-gray-50'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Hint toggle */}
      <button
        onClick={() => setShowHint(!showHint)}
        className="block text-blue-600 hover:underline mx-auto"
      >
        💡 Need a hint?
      </button>

      {/* Display hint */}
      {showHint && hint && (
        <div className="mt-2 text-sm text-gray-600">
          <span className="font-semibold">Hint:</span> {hint}
        </div>
      )}
    </div>
  );
};

QuestionCard.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  hint: PropTypes.string,
  currentIndex: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
};

export default QuestionCard;
