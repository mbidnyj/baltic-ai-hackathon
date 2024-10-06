import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import QuestionCard from './QuestionCard'; // Ensure this component exists and is correctly implemented

const EditModule = () => {
    const { moduleId } = useParams(); // Get moduleId from the URL params
    const navigate = useNavigate();
    const location = useLocation(); // Access location object to get state
    const { moduleData } = location.state || {}; // Destructure moduleData from state

    const [moduleInfo, setModuleInfo] = useState({});
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to process incoming questions
    const handleIncomingQuestions = (result) => {
        try {
            console.log('Processing quiz data...');
            // Use result directly since it's an object
            const quizQuestions = result.quiz || [];

            const formattedQuestions = quizQuestions.map((questionItem) => {
                const choices = questionItem.options.map((option) => ({
                    text: option,
                    isCorrect: option === questionItem.correct_answer,
                }));

                return {
                    question_text: questionItem.question,
                    choices: choices,
                    points: 1,
                    question_type: questionItem.question_type.toUpperCase(),
                    hint: questionItem.hint || '',
                };
            });

            setQuestions(formattedQuestions);
        } catch (error) {
            console.error('Error processing questions:', error);
            setError('Failed to process questions');
        }
    };

    // Function to fetch module data from backend
    const fetchModuleData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/module/${moduleId}`);

            if (!response.ok) {
                throw new Error('Failed to fetch module data');
            }

            const data = await response.json();
            console.log('Fetched data from backend:', data);

            setModuleInfo({
                moduleId: data.moduleId,
                title: data.title || '',
                description: data.description || '',
                // Add other fields as needed
            });

            if (data.result) {
                handleIncomingQuestions(data.result);
            } else {
                console.error('No result field in the response data');
                setError('No quiz data found');
            }

            setLoading(false);
        } catch (error) {
            console.error('Error fetching module data:', error);
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (moduleData) {
            // Use the moduleData passed from the AddModuleModal
            console.log('Using module data from navigation state:', moduleData);
            setModuleInfo({
                moduleId: moduleData.moduleId,
                title: moduleData.title || '',
                description: moduleData.description || '',
                // Add other fields as needed
            });

            if (moduleData.result) {
                handleIncomingQuestions(moduleData.result);
            } else {
                console.error('No result field in the moduleData');
                setError('No quiz data found');
            }

            setLoading(false);
        } else {
            // Fetch from backend
            fetchModuleData();
        }
    }, [moduleId]);

    // Handler to update the question text
    const handleUpdateQuestion = (newText, questionIndex) => {
        const updatedQuestions = questions.map((question, qIndex) => {
            if (qIndex === questionIndex) {
                return {
                    ...question,
                    question_text: newText,
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

    // Handler to change a choice text
    const handleChoiceTextChange = (userText, choiceIndex, questionIndex) => {
        const updatedQuestions = questions.map((question, qIndex) => {
            if (qIndex === questionIndex) {
                const updatedChoices = question.choices.map((choice, cIndex) => ({
                    ...choice,
                    text: cIndex === choiceIndex ? userText : choice.text,
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

    // Handler to change points
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

    const handlePublishModule = () => {
        console.log('Publish module logic here');
        // Implement publish logic here, possibly sending data to the backend
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
                hint: '',
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
                                    {moduleInfo.title || 'Module Title'}
                                </div>
                                <div>
                                    <button className="text-gray-500 hover:text-gray-700">
                                        <VisibilityIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-600">{moduleInfo.description || 'Module Description'}</p>
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
                                        <div className="gap-2 self-stretch px-1 my-auto">
                                            {/* Calculate total points */}
                                            {questions.reduce((total, q) => total + (q.points || 0), 0)} Points
                                        </div>
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
                            <button className="px-4 py-2 bg-white border border-solid rounded-lg font-semibold text-gray-700">
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
                                onUpdateQuestion={(newText) => handleUpdateQuestion(newText, index)}
                                onDelete={() => handleDeleteQuestion(index)}
                                onPointsChange={(newPoints) => handlePointsChange(newPoints, index)}
                                onQuestionChange={(newText) => handleUpdateQuestion(newText, index)}
                                onChoiceTextChange={(userText, choiceIndex) =>
                                    handleChoiceTextChange(userText, choiceIndex, index)
                                }
                                onChoiceCorrectChange={(choiceIndex) =>
                                    handleChoiceCorrectChange(choiceIndex, index)
                                }
                                isEditable={true}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default EditModule;
