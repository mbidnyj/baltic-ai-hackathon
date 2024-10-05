import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility'; // Material Icon for visibility
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
                            <div className="flex gap-2 justify-between items-center">
                                <div className="text-2xl font-semibold tracking-normal text-black">
                                    {moduleData.title}
                                </div>
                                <div>
                                    <button className="text-gray-500 hover:text-gray-700">
                                        <VisibilityIcon className="w-5 h-5" /> {/* Material Icon for eye */}
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-600">{moduleData.description}</p>
                            <div className="flex gap-2 items-start self-start mt-2 text-xs font-medium tracking-normal leading-none text-gray-800">
                                <div className="flex items-start shadow-sm">
                                    <div className="flex gap-px items-center p-1.5 bg-white rounded-md border border-solid">
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/86c6336195520e4093240f4566c5b56a63261e1de2bc373f48ecf19f6968ae8e"
                                            className="object-contain shrink-0 self-stretch my-auto w-3 aspect-square"
                                        />
                                        <div className="gap-2 self-stretch px-1 my-auto">
                                            {questions.length} Questions
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start shadow-sm">
                                    <div className="flex gap-px items-center p-1.5 bg-white rounded-md border border-solid">
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e25f42e4cd3c5ef2cd449ca923e46008948393e2516bb0229a7466fc7e3972ee"
                                            className="object-contain shrink-0 self-stretch my-auto w-3 aspect-square"
                                        />
                                        <div className="gap-2 self-stretch px-1 my-auto">{questions.length} Points</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2">
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
                            <button
                                className="px-4 py-3.5 bg-white border border-solid rounded-lg text-red-600 shadow-sm"
                            >
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6a4e88b2c927a2e8cbe917c2f00e2c87d5e85adf4e2506737cf234061a3880f0"
                                    className="object-contain w-4"
                                />
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
