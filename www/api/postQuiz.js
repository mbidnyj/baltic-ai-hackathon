const express = require('express');
const router = express.Router();
const { db } = require('../integrations/dbModule');

// Endpoint to save a quiz
router.post('/quiz', async (req, res) => {
    try {
        const { module_id, is_initial, created_by, questions } = req.body;

        if (!module_id || !created_by || !questions || !Array.isArray(questions)) {
            return res.status(400).json({ success: false, message: 'Missing required fields or invalid data' });
        }

        // Get question count from the length of questions array
        const question_count = questions.length;

        // Insert into quizzes table
        const insertQuizQuery = `INSERT INTO quizzes (module_id, is_initial, question_count, created_by) VALUES (?, ?, ?, ?)`;
        const quizParams = [module_id, is_initial ? 1 : 0, question_count, created_by];

        db.run(insertQuizQuery, quizParams, function(err) {
            if (err) {
                console.error('Error inserting quiz:', err.message);
                return res.status(500).json({ success: false, message: 'Failed to create quiz' });
            }

            const quiz_id = this.lastID;

            // Now insert questions and answer options
            const insertQuestionsAndOptions = async () => {
                for (const question of questions) {
                    // Insert question
                    const insertQuestionQuery = `INSERT INTO questions (quiz_id, question_text, hint) VALUES (?, ?, ?)`;
                    const questionParams = [quiz_id, question.question_text, question.hint || ''];

                    const question_id = await new Promise((resolve, reject) => {
                        db.run(insertQuestionQuery, questionParams, function(err) {
                            if (err) {
                                console.error('Error inserting question:', err.message);
                                reject(err);
                            } else {
                                resolve(this.lastID);
                            }
                        });
                    });

                    // Insert answer options
                    const insertOptionsPromises = question.choices.map((choice) => {
                        return new Promise((resolve, reject) => {
                            const insertOptionQuery = `INSERT INTO answer_options (question_id, option_text, is_correct) VALUES (?, ?, ?)`;
                            const optionParams = [question_id, choice.text, choice.isCorrect ? 1 : 0];

                            db.run(insertOptionQuery, optionParams, function(err) {
                                if (err) {
                                    console.error('Error inserting answer option:', err.message);
                                    reject(err);
                                } else {
                                    resolve();
                                }
                            });
                        });
                    });

                    // Wait for all options of this question to be inserted
                    await Promise.all(insertOptionsPromises);
                }
            };

            insertQuestionsAndOptions()
                .then(() => {
                    res.status(200).json({ success: true, quiz_id });
                })
                .catch((err) => {
                    console.error('Error inserting questions and options:', err.message);
                    res.status(500).json({ success: false, message: 'Failed to insert questions and options' });
                });
        });
    } catch (error) {
        console.error('Error in /api/quiz:', error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
