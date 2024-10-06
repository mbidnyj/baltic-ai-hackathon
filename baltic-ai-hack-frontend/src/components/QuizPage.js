import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

// Example data for quiz questions, which could be fetched from a backend or hardcoded
const quizData = [
  {
    question: "How do you like to learn new things?",
    options: [
      "By watching videos",
      "By doing hands-on activities",
      "By reading books or articles",
      "By discussing with friends",
    ],
    answer: null,
  },
  {
    question: "How do you usually organize your tasks?",
    options: [
      "I use a to-do list",
      "I rely on deadlines",
      "I organize tasks mentally",
      "I seek help from others",
    ],
    answer: null,
  },
  {
    question: "What type of feedback do you prefer?",
    options: [
      "Detailed written feedback",
      "Verbal feedback",
      "Peer feedback",
      "Self-assessment",
    ],
    answer: null,
  },
];

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0); // Track the current question
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Track the selected answer
  const totalQuestions = quizData.length;

  const { setQuizView } = useUser();
  const navigate = useNavigate();

  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  // Move to the next question
  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      quizData[currentQuestion].answer = selectedAnswer;
      setSelectedAnswer(null); // Reset answer selection
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setQuizView("result");
        navigate("/result");
        console.log("Quiz completed:", quizData); // For now, log the results to console
      }
    } else {
      alert("Please select an answer before proceeding.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-min p-8">
      {/* Subject Tag */}
      <div className="bg-green-100 text-green-700 font-semibold px-4 py-2 rounded-full flex items-center mb-6">
        <span className="mr-2">🔗</span>
        <span>Physics</span>
      </div>

      <div className="w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-6">
          {currentQuestion + 1}. {quizData[currentQuestion].question}
        </h2>

        {/* Options */}
        <div className="space-y-4 mb-8">
          {quizData[currentQuestion].options.map((option, index) => (
            <label
              key={index}
              className={`flex items-center p-4 border-2 rounded-lg cursor-pointer text-center ${
                selectedAnswer === option
                  ? "border-blue-500 bg-blue-100"
                  : "border-gray-300"
              }`}
              onClick={() => handleAnswerSelect(option)}
            >
              <input
                type="radio"
                name="answer"
                value={option}
                checked={selectedAnswer === option}
                onChange={() => handleAnswerSelect(option)}
                className="mr-4"
              />
              {option}
            </label>
          ))}
        </div>

        <button
          onClick={handleNextQuestion}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded"
        >
          {currentQuestion < totalQuestions - 1 ? "Next" : "Finish"}
        </button>

        <div className="flex justify-between items-center mt-4 text-gray-400">
          <button
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            className="text-lg"
          >
            &lt;
          </button>
          <p>
            {currentQuestion + 1} of {totalQuestions}
          </p>
          <button
            disabled={currentQuestion === totalQuestions - 1}
            onClick={handleNextQuestion}
            className="text-lg"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
