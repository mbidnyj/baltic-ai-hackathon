import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ModulePreviewTop from './ModulePreviewTop'; // Your new top component
import QuestionCard from './QuestionCard'; // Import the QuestionCard component

const ModulePreview = () => {
  const { moduleId } = useParams(); // Get moduleId from the URL
  const [moduleData, setModuleData] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModuleData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/module/${moduleId}/preview`);
        if (!response.ok) {
          throw new Error('Failed to fetch module data');
        }
        const data = await response.json();

        setModuleData(data.module); // Set the module details
        setQuizData(data.quiz);     // Set the quiz data (can be null)
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchModuleData();
  }, [moduleId]);

  const handleDeleteModule = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/module/${moduleId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete module');
      }
      // After deletion, navigate to a different route (for example, back to the dashboard)
      navigate('/');
    } catch (error) {
      console.error('Error deleting module:', error);
    }
  };

  return (
    <div className="p-8">
      {/* Top Section */}
      <ModulePreviewTop
        title={moduleData?.title || "Module Title"}
        questionCount={quizData?.questions.length || 0}
        points={quizData?.questions.length || 0}
        onDelete={handleDeleteModule} // Pass the delete handler here
      />

      {/* Loading and Error State */}
      {loading && <p>Loading module data...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Module Information */}
      {moduleData && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Module Information:</h2>
          <p><strong>Title:</strong> {moduleData.title}</p>
          <p><strong>Description:</strong> {moduleData.description}</p>
          <p><strong>Subject:</strong> {moduleData.subject}</p>
          <p><strong>Grade:</strong> {moduleData.grade}</p>
          <p><strong>Students Enrolled:</strong> {moduleData.students}</p>
        </div>
      )}

      {/* Quiz Questions */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Initial Quiz:</h2>
        {quizData ? (
          <div>
            {/* Render each question using QuestionCard */}
            {quizData.questions.map((question, index) => (
              <QuestionCard
                key={index}
                question={question.question_text}
                options={question.options}
                hint={question.hint}
                currentIndex={index + 1}
                totalQuestions={quizData.questions.length}
              />
            ))}
          </div>
        ) : (
          <p>No initial quiz found for this module.</p>
        )}
      </div>
    </div>
  );
};

export default ModulePreview;
