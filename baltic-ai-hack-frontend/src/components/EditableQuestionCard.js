import React, { useState } from 'react';
import PropTypes from 'prop-types';

const EditableQuestionCard = ({ question, index, totalQuestions, onUpdateQuestion, onDeleteQuestion }) => {
  const [questionText, setQuestionText] = useState(question.question_text);
  const [options, setOptions] = useState(question.options);
  const [points, setPoints] = useState(question.points);
  const [questionType, setQuestionType] = useState(question.question_type);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSave = () => {
    const updatedQuestion = {
      ...question,
      question_text: questionText,
      options,
      points,
      question_type: questionType,
    };
    onUpdateQuestion(updatedQuestion);
  };

  return (
    <div className="p-4 mb-4 border rounded-lg shadow-sm bg-white">
      <div className="flex justify-between items-center mb-2">
        <span>
          {index + 1}. {questionType} ({points} point{points > 1 ? 's' : ''})
        </span>
        <button onClick={onDeleteQuestion} className="text-red-500 hover:text-red-700">
          Delete
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Question Text</label>
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Question Options */}
      {options.map((option, optionIndex) => (
        <div key={optionIndex} className="mb-2">
          <label className="block text-gray-700">Option {optionIndex + 1}</label>
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      ))}

      {/* Question Type and Points */}
      <div className="flex gap-4 mt-4">
        <div>
          <label className="block text-gray-700">Question Type</label>
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="MULTIPLE_CHOICE">Multiple Choice</option>
            <option value="OPEN_ANSWER">Open Answer</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Points</label>
          <input
            type="number"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg"
      >
        Save Changes
      </button>
    </div>
  );
};

EditableQuestionCard.propTypes = {
  question: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  onUpdateQuestion: PropTypes.func.isRequired,
  onDeleteQuestion: PropTypes.func.isRequired,
};

export default EditableQuestionCard;
