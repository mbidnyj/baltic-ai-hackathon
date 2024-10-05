const { db } = require('../integrations/dbModule'); // Import the database connection

module.exports = (req, res) => {
  const { moduleId } = req.query;

  // Fetch the quiz associated with the given moduleId
  db.get(`SELECT * FROM quizzes WHERE module_id = ? AND is_initial = 1`, [moduleId], (err, quiz) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to retrieve quiz" });
    }

    // If no quiz found, return a message
    if (!quiz) {
      return res.status(404).json({ message: "No quiz found for this module" });
    }

    // Fetch questions and options associated with the quiz
    db.all(`SELECT q.id as question_id, q.question_text, q.hint, 
            a.option_text, a.is_correct 
            FROM questions q 
            LEFT JOIN answer_options a ON q.id = a.question_id 
            WHERE q.quiz_id = ?`, [quiz.id], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to retrieve questions and options" });
      }

      // Format the questions and options properly
      const questions = {};
      rows.forEach(row => {
        if (!questions[row.question_id]) {
          questions[row.question_id] = {
            question_id: row.question_id,
            question_text: row.question_text,
            hint: row.hint,
            options: []
          };
        }
        questions[row.question_id].options.push({
          option_text: row.option_text,
          is_correct: row.is_correct
        });
      });

      // Send the formatted response
      res.json({
        quiz: {
          id: quiz.id,
          module_id: quiz.module_id,
          questions: Object.values(questions) // Convert the object to an array
        }
      });
    });
  });
};
