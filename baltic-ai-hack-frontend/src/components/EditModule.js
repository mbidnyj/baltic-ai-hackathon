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
                const response = await fetch(`http://localhost:8080/api/getQuizFromLocalStorage/${moduleId}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch module data');
                }

                const data = await response.json();

                setModuleData(data.module || {}); // Safeguard against undefined
                setQuestions(data.quiz?.questions || []); // Safeguard against missing quiz
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchModuleData();
    }, [moduleId]);

    // Handler to update the question
    const handleUpdateQuestion = (newText, questionIndex) => {
        const updatedQuestions = questions.map((question, qIndex) => {
            if (qIndex === questionIndex) {
                return {
                    ...question,
                    question_text: newText, // Update the question text
                };
            }
            return question;
        });

        setQuestions(updatedQuestions);
    };

    // Handler to delete a question
    const handleDeleteQuestion = (index) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
    };

    // Handler to mark a choice as correct
    const handleChoiceCorrectChange = (choiceIndex, questionIndex) => {
        const updatedQuestions = questions.map((question, qIndex) => {
            if (qIndex === questionIndex) {
                const updatedChoices = question.choices.map((choice, cIndex) => ({
                    ...choice,
                    isCorrect: cIndex === choiceIndex, // Only the clicked choice is marked as correct
                }));

                return {
                    ...question,
                    choices: updatedChoices,
                };
            }
            return question;
        });

        setQuestions(updatedQuestions);
    };

    const handlePointsChange = (newPoints, questionIndex) => {
        const updatedQuestions = questions.map((question, qIndex) => {
            if (qIndex === questionIndex) {
                return {
                    ...question,
                    points: newPoints,
                };
            }
            return question;
        });

        setQuestions(updatedQuestions);
    };

    // Handler to change a choice text
    const handleChoiceTextChange = (userText, choiceIndex, questionIndex) => {
        const updatedQuestions = questions.map((question, qIndex) => {
            if (qIndex === questionIndex) {
                const updatedChoices = question.choices.map((choice, cIndex) => ({
                    ...choice,
                    text: cIndex === choiceIndex ? userText : choice.text, // Update only the correct choice's text
                }));

                return {
                    ...question,
                    choices: updatedChoices,
                };
            }
            return question;
        });

        setQuestions(updatedQuestions);
    };


    const handlePublishModule = () => {
        console.log('Publish module logic here');
    };

    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            {
                question_text: 'New Question',
                choices: [
                    { text: 'Option 1', isCorrect: false },
                    { text: 'Option 2', isCorrect: false },
                    { text: 'Option 3', isCorrect: false },
                    { text: 'Option 4', isCorrect: false },
                ],
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
                                className="px-4 py-2 bg-white border border-solid rounded-lg font-semibold text-gray-700"
                            >
                                + Add Question
                            </button>
                            <button className="px-4 py-2 bg-white border border-solid rounded-lg font-semibold  text-gray-700">
                                Generate new questions
                            </button>
                            <button
                                onClick={handlePublishModule}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                            >
                                Publish Study Module
                            </button>
                            <button
                                className="px-4 py-3.5 bg-white border border-solid rounded-lg text-red-600"
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
                    <div className="mb-4 max-w-[930px]">
                        <label className="block text-gray-700">Change file</label>
                        <input type="file" className="w-full px-3 py-2 border rounded-md" />
                    </div>

                    {/* Question List */}
                    <div className="space-y-2 mb-2">
                        {questions.map((question, index) => (
                            <QuestionCard
                                key={index}
                                question={question}
                                index={index}
                                totalQuestions={questions.length}
                                onUpdateQuestion={(updatedQuestion) => handleUpdateQuestion(index, updatedQuestion)}
                                onDelete={() => handleDeleteQuestion(index)}
                                onPointsChange={handlePointsChange}
                                onQuestionChange={handleUpdateQuestion}
                                onChoiceTextChange={handleChoiceTextChange}
                                onChoiceCorrectChange={handleChoiceCorrectChange} // Pass handler for marking correct choice
                                isEditable={true} // Pass prop to make it editable
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default EditModule;
