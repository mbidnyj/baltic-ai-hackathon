import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionCard from './QuestionCard'; // Make sure to adjust QuestionCard for editability

const EditModule = () => {
  const { moduleId } = useParams(); // Get moduleId from the URL params
  const navigate = useNavigate();
  const [moduleData, setModuleData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModuleData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/module/${moduleId}`);

        // Log the response status to check if it hits the API correctly
        console.log('Response Status:', response.status);
        
        if (!response.ok) {
          // Log the response to capture what's going wrong
          console.error('Failed to fetch module data:', response);
          throw new Error('Failed to fetch module data');
        }

        const data = await response.json();

        // Ensure we are logging the data returned from the API to inspect it
        console.log('Fetched Module Data:', data);

        setModuleData(data.module || {}); // Safeguard against undefined
        setQuestions(data.quiz?.questions || []); // Safeguard against missing quiz
        setLoading(false);
      } catch (error) {
        console.error('Error fetching module:', error); // Log the actual error
        setError(error.message);
        setLoading(false);
      }
    };

    fetchModuleData();
  }, [moduleId]);

  // Handler to update the question
  const handleUpdateQuestion = (index, updatedQuestion) => {
    const newQuestions = [...questions];
    newQuestions[index] = updatedQuestion;
    setQuestions(newQuestions);
  };

  // Handler to delete a question
  const handleDeleteQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handlePublishModule = () => {
    console.log('Publish module logic here');
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        question_text: 'New Question',
        options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
        points: 1,
        question_type: 'MULTIPLE_CHOICE',
      },
    ]);
  };

  return (
    <div className="p-8">
      {loading ? (
        <p>Loading module data...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <>
          {/* Top Section */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold">{moduleData.title}</h1>
              <p className="text-gray-600">{moduleData.description}</p>
              <div className="flex gap-2 mt-2">
                <span className="bg-gray-100 px-3 py-1 rounded-md">
                  {questions.length} Questions
                </span>
                <span className="bg-gray-100 px-3 py-1 rounded-md">
                  {questions.length} Points
                </span>
              </div>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={handleAddQuestion}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700"
                >
                    + Add Question
                </button>
                <button className="px-4 py-2 bg-gray-200 text-blue-600 rounded-lg font-semibold shadow">
                    Generate new questions
                </button>
                <button
                    onClick={handlePublishModule}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700"
                >
                    Publish Study Module
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold shadow">
                    <span role="img" aria-label="delete">
                    🗑️
                    </span>
                </button>
            </div>
          </div>

          {/* File Upload Section */}
          <div className="mb-4">
            <label className="block text-gray-700">Change file</label>
            <input type="file" className="w-full px-3 py-2 border rounded-md" />
          </div>

          

          {/* Question List */}
          {questions.map((question, index) => (
            <QuestionCard
                key={index}
                question={question}
                index={index}
                totalQuestions={questions.length}
                onUpdateQuestion={(updatedQuestion) => handleUpdateQuestion(index, updatedQuestion)}
                onDeleteQuestion={() => handleDeleteQuestion(index)}
                isEditable={true} // Pass prop to make it editable
            />
          ))}
        </>
      )}
    </div>
  );
};

export default EditModule;
