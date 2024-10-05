import React from 'react';
import {
  HelpOutline as QuestionTypeIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { Checkbox, IconButton, MenuItem, Select, TextField } from '@mui/material';

function QuestionCard({
  question = {}, // Object with question text, points, and choices
  index,
  onQuestionChange,
  onChoiceTextChange,
  onChoiceCorrectChange,
  onPointsChange,
  onDelete,
  isEditable = true, // Prop to toggle editing mode
}) {
  // Ensure the question always has 4 choices
  const choices = [...(question.choices || [])];

  // If there are fewer than 4 choices, fill the rest with default empty choices
  while (choices.length < 4) {
    choices.push({ text: '', isCorrect: false });
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-solid shadow-sm max-w-[930px] bg-white mb-4">
      <div className="flex flex-col items-start p-5 w-full">
        {/* Header */}
        <div className="flex justify-between w-full items-center">
          {/* Left section */}
          <div className="flex gap-3 items-center min-w-[240px]">
            {/* Question type icon */}
            <div className="flex items-center px-4 py-2 bg-white border border-solid rounded-lg font-semibold text-gray-700">
  <QuestionTypeIcon />
  <div className="ml-2">Multiple Choice</div>
</div>
{/* Points dropdown */}
<div className="ml-2">
  <Select
    value={question.points || 1}
    onChange={(e) => onPointsChange(e, index)}
    className="ml-1"
    disabled={!isEditable}
    variant="outlined" // Ensures the outline style is consistent
    size="small" // Reduces the size of the dropdown
  >
    <MenuItem value={1}>1 point</MenuItem>
    <MenuItem value={2}>2 points</MenuItem>
    <MenuItem value={3}>3 points</MenuItem>
  </Select>
</div>


          </div>

          {/* Right section */}
          <div className="flex gap-2">
            <IconButton onClick={() => onDelete(index)}>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>

        {/* Question Text */}
        <div className="flex flex-col mt-4 w-full">
          <TextField
            value={question.question_text || ''}
            onChange={(e) => onQuestionChange(e.target.value, index)}
            placeholder="Enter your question here"
            fullWidth
            multiline
            variant="outlined"
            disabled={!isEditable}
          />
        </div>

        {/* Answer choices */}
        <div className="mt-2 text-sm font-semibold text-gray-500">Answer choices</div>
        <div className="grid grid-cols-2 gap-4 mt-4 w-full">
          {choices.map((choice, choiceIndex) => (
            <div className="flex items-center w-full" key={choiceIndex}>
              <div className="flex gap-4 items-start rounded-lg w-full border-gray-300 bg-white">
                <Checkbox
                  checked={choice.isCorrect}
                  onChange={() => onChoiceCorrectChange(choiceIndex, index)}
                  color="primary"
                  disabled={!isEditable}
                />
                <TextField
                  value={choice.text}
                  onChange={(e) => onChoiceTextChange(e.target.value, choiceIndex, index)}
                  placeholder={`Choice ${choiceIndex + 1}`}
                  fullWidth
                  variant="outlined"
                  disabled={!isEditable}
                />
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default QuestionCard;
