import React, { useState } from 'react';
import {
  HelpOutline as QuestionTypeIcon,
  ListAlt as MultipleChoiceIcon,
  Star as PointsIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  RemoveCircleOutline as RemoveChoiceIcon,
  AddCircleOutline as AddChoiceIcon,
} from '@mui/icons-material';
import { Radio, IconButton } from '@mui/material';

function QuestionCard() {
  // Internal state management
  const [questionText, setQuestionText] = useState('What is the meaning of life?');
  const [points, setPoints] = useState(1);
  const [choices, setChoices] = useState([
    { text: '42', isCorrect: true },
    { text: 'A chicken sandwich', isCorrect: false },
    { text: '12', isCorrect: false },
    { text: 'A worthless question to ask', isCorrect: false },
  ]);

  // Handlers for internal state
  const handleQuestionChange = (e) => {
    setQuestionText(e.target.value);
  };

  const handleChoiceTextChange = (index, text) => {
    const newChoices = choices.map((choice, i) =>
      i === index ? { ...choice, text } : choice
    );
    setChoices(newChoices);
  };

  const handleChoiceCorrectChange = (index) => {
    const newChoices = choices.map((choice, i) => ({
      ...choice,
      isCorrect: i === index,
    }));
    setChoices(newChoices);
  };

  const handleAddChoice = () => {
    setChoices([...choices, { text: '', isCorrect: false }]);
  };

  const handleRemoveChoice = (index) => {
    const newChoices = choices.filter((_, i) => i !== index);
    setChoices(newChoices);
  };

  // Placeholder functions for routing/actions
  const handleEdit = () => {
    // Implement edit action or routing here
  };

  const handleDelete = () => {
    // Implement delete action or routing here
  };

  return (
    <div className="flex overflow-hidden flex-col rounded-xl border border-solid shadow-sm max-w-[930px]">
      <div className="flex flex-col items-start p-5 w-full bg-white max-md:max-w-full">
        {/* Header */}
        <div className="flex flex-wrap gap-10 justify-between items-start w-full">
          {/* Left section */}
          <div className="flex gap-2 items-center min-w-[240px]">
            {/* Question type icon */}
            <div className="flex text-base font-semibold text-gray-500 min-h-[36px] w-[36px]">
              <QuestionTypeIcon />
            </div>
            {/* Question type label */}
            <div className="flex items-center text-base font-semibold text-gray-500">
              <div className="flex items-center bg-white rounded-lg border shadow-sm px-3 py-2.5">
                <MultipleChoiceIcon />
                <div className="ml-2">Multiple Choice</div>
              </div>
            </div>
            {/* Points */}
            <div >
              <select
                className="w-full px-4 py-2 font-medium border border-gray-200 rounded-md text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Subject</option>
                <option value="1">1 point</option>
                <option value="2">2 points</option>
                <option value="3">3 points</option>
              </select>
            </div>
          </div>
          {/* Right section */}
          <div className="flex gap-2 items-start">
            {/* Edit button */}
            <div className="flex min-h-[38px] w-[38px]">
              <IconButton
                className="flex justify-center items-center bg-white rounded-lg border shadow-sm h-[38px] w-[38px]"
                onClick={handleEdit}
              >
                <EditIcon style={{ fontSize: '1.5rem' }} />
              </IconButton>
            </div>
            {/* Delete button */}
            <div className="flex min-h-[38px] w-[38px]">
              <IconButton
                className="flex justify-center items-center bg-white rounded-lg border shadow-sm h-[38px] w-[38px]"
                onClick={handleDelete}
              >
                <DeleteIcon style={{ fontSize: '1.5rem' }} />
              </IconButton>
            </div>
          </div>
        </div>
        {/* Question and Answer Choices */}
        <div className="flex flex-col mt-4 w-full">
          {/* Question text */}
          <textarea
            className="text-lg font-bold text-gray-800 w-full border-b border-gray-300 focus:outline-none focus:border-teal-500"
            value={questionText}
            onChange={handleQuestionChange}
            placeholder="Enter your question here"
            rows={2}
          />
          {/* Answer choices label */}
          <div className="mt-1.5 text-sm font-semibold text-gray-500">Answer choices</div>
        </div>
        {/* Answer choices */}
        <div className="flex flex-wrap gap-4 items-start mt-4 w-full">
          {choices.map((choice, index) => (
            <div className="flex items-center min-w-[240px] w-[355px]" key={index}>
              <div className="flex gap-4 items-start rounded-lg w-full">
                {/* Radio button */}
                <div className="flex items-center pt-1 w-4">
                  <Radio
                    color="primary"
                    checked={choice.isCorrect}
                    onChange={() => handleChoiceCorrectChange(index)}
                  />
                </div>
                {/* Choice text */}
                <input
                  type="text"
                  className={`flex-1 text-base font-medium tracking-normal min-w-[240px] border-b border-gray-300 focus:outline-none ${choice.isCorrect ? 'text-teal-500' : 'text-gray-800'
                    }`}
                  value={choice.text}
                  onChange={(e) => handleChoiceTextChange(index, e.target.value)}
                  placeholder={`Choice ${index + 1}`}
                />
                {/* Remove choice button */}
                <IconButton onClick={() => handleRemoveChoice(index)} className="ml-2">
                  <RemoveChoiceIcon style={{ fontSize: '1.25rem' }} />
                </IconButton>
              </div>
            </div>
          ))}
          {/* Add choice button */}
          <div className="flex items-center min-w-[240px] w-[355px] mt-2">
            <button
              className="flex items-center text-teal-500 font-medium"
              onClick={handleAddChoice}
            >
              <AddChoiceIcon style={{ fontSize: '1.25rem', marginRight: '0.25rem' }} />
              Add Choice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;