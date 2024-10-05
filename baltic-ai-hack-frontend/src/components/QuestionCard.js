import React, { useState } from 'react';
import PropTypes from 'prop-types';

const QuestionCard = ({ 
  question, 
  index, 
  totalQuestions, 
  onUpdateQuestion, 
  onDeleteQuestion, 
  isEditable 
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(question);

  const handleOptionChange = (optionIndex, newValue) => {
    const updatedOptions = [...currentQuestion.options];
    updatedOptions[optionIndex] = newValue;
    const updatedQuestion = { ...currentQuestion, options: updatedOptions };
    setCurrentQuestion(updatedQuestion);
    onUpdateQuestion(updatedQuestion); // Call the update function passed as a prop
  };

  return (
    <div className="p-4 mb-4 border rounded-lg shadow-sm bg-white">
      {/* Question and Number */}
      <div className="flex justify-between items-center">
        {isEditable ? (
          <input
            type="text"
            value={currentQuestion.question_text}
            onChange={(e) =>
              setCurrentQuestion({
                ...currentQuestion,
                question_text: e.target.value,
              })
            }
            className="text-lg font-bold mb-2 border px-2 py-1 rounded w-full"
          />
        ) : (
          <h3 className="text-lg font-bold mb-2">{currentQuestion.question_text}</h3>
        )}
        <span className="text-gray-500">
          {index + 1}/{totalQuestions}
        </span>
      </div>

      {/* Options */}
      <div className="space-y-2">
        {currentQuestion.options.map((option, optionIndex) => (
          <div key={optionIndex}>
            {isEditable ? (
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
                className="block w-full text-left p-2 border rounded-lg"
              />
            ) : (
              <button
                key={optionIndex}
                className="block w-full text-left p-2 border rounded-lg bg-gray-50"
              >
                {option}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Editable Actions */}
      {isEditable && (
        <div className="flex justify-between items-center mt-4">
          {/* Delete Button */}
          <button
            onClick={onDeleteQuestion}
            className="text-red-500 flex items-center gap-2"
          >
            🗑️ Delete
          </button>
          {/* Add Option Button */}
          <button
            onClick={() =>
              handleOptionChange(
                currentQuestion.options.length,
                `Option ${currentQuestion.options.length + 1}`
              )
            }
            className="text-blue-600 flex items-center gap-2"
          >
            + Add Option
          </button>
        </div>
      )}

      {/* Hint (only display if it's not editable) */}
      {!isEditable && currentQuestion.hint && (
        <div className="mt-4 text-sm text-gray-600">
          <span className="font-semibold">Hint:</span> {currentQuestion.hint}
        </div>
      )}
    </div>
  );
};

QuestionCard.propTypes = {
  question: PropTypes.shape({
    question_text: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    hint: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  onUpdateQuestion: PropTypes.func.isRequired,
  onDeleteQuestion: PropTypes.func.isRequired,
  isEditable: PropTypes.bool,
};

QuestionCard.defaultProps = {
  isEditable: false,
};

export default QuestionCard;
