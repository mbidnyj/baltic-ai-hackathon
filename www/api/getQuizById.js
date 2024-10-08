const express = require("express");
const { db } = require("../integrations/dbModule");

module.exports = (req, res) => {
    const quiz_id = req.params.quiz_id;

    // First, get the quiz info
    const getQuizQuery = `SELECT * FROM quizzes WHERE id = ?`;
    db.get(getQuizQuery, [quiz_id], (err, quiz) => {
        if (err) {
            console.error("Error retrieving quiz:", err.message);
            return res.status(500).json({ success: false, message: "Failed to retrieve quiz" });
        }
        if (!quiz) {
            return res.status(404).json({ success: false, message: "Quiz not found" });
        }

        // Now get the questions
        const getQuestionsQuery = `SELECT * FROM questions WHERE quiz_id = ?`;
        db.all(getQuestionsQuery, [quiz_id], (err, questions) => {
            if (err) {
                console.error("Error retrieving questions:", err.message);
                return res.status(500).json({ success: false, message: "Failed to retrieve questions" });
            }

            // For each question, get the answer options
            const getOptionsPromises = questions.map((question) => {
                return new Promise((resolve, reject) => {
                    const getOptionsQuery = `SELECT * FROM answer_options WHERE question_id = ?`;
                    db.all(getOptionsQuery, [question.id], (err, options) => {
                        if (err) {
                            console.error("Error retrieving answer options:", err.message);
                            reject(err);
                        } else {
                            question.options = options.map((option) => ({
                                text: option.option_text,
                                isCorrect: option.is_correct ? true : false,
                            }));
                            resolve();
                        }
                    });
                });
            });

            // Wait for all options to be retrieved
            Promise.all(getOptionsPromises)
                .then(() => {
                    // Now assemble the quiz data
                    const quizData = {
                        id: quiz.id,
                        module_id: quiz.module_id,
                        is_initial: quiz.is_initial ? true : false,
                        question_count: quiz.question_count,
                        created_by: quiz.created_by,
                        created_at: quiz.created_at,
                        questions: questions.map((question) => ({
                            id: question.id,
                            question_text: question.question_text,
                            hint: question.hint,
                            choices: question.options,
                        })),
                    };

                    res.status(200).json({ success: true, quiz: quizData });
                })
                .catch((err) => {
                    console.error("Error retrieving answer options:", err.message);
                    res.status(500).json({ success: false, message: "Failed to retrieve answer options" });
                });
        });
    });
};
