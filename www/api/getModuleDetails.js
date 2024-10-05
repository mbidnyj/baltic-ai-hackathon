const { db } = require('../integrations/dbModule');

module.exports = (req, res) => {
  const { moduleId } = req.params;

  // Fetch module details
  db.get(`SELECT * FROM modules WHERE id = ?`, [moduleId], (err, moduleRow) => {
    if (err) {
      console.error('Error fetching module details:', err.message);
      return res.status(500).json({ error: 'Failed to fetch module details' });
    }

    if (!moduleRow) {
      return res.status(404).json({ error: 'Module not found' });
    }

    // Fetch the quiz details (initial quiz) for the module
    db.get(`SELECT * FROM quizzes WHERE module_id = ? AND is_initial = 1`, [moduleId], (err, quizRow) => {
      if (err) {
        console.error('Error fetching quiz:', err.message);
        return res.status(500).json({ error: 'Failed to fetch quiz' });
      }

      if (!quizRow) {
        // No quiz exists for this module
        return res.json({
          module: moduleRow,
          quiz: null // No quiz found
        });
      }

      // Fetch the questions for the quiz
      db.all(`SELECT * FROM questions WHERE quiz_id = ?`, [quizRow.id], (err, questions) => {
        if (err) {
          console.error('Error fetching questions:', err.message);
          return res.status(500).json({ error: 'Failed to fetch quiz questions' });
        }

        // Fetch the options for each question
        const questionIds = questions.map(q => q.id);
        db.all(`SELECT * FROM answer_options WHERE question_id IN (${questionIds.join(',')})`, [], (err, options) => {
          if (err) {
            console.error('Error fetching options:', err.message);
            return res.status(500).json({ error: 'Failed to fetch answer options' });
          }

          // Group options by question_id
          const groupedOptions = {};
          options.forEach(option => {
            if (!groupedOptions[option.question_id]) {
              groupedOptions[option.question_id] = [];
            }
            groupedOptions[option.question_id].push(option.option_text);
          });

          // Attach options to their respective questions
          const questionsWithOptions = questions.map(question => ({
            ...question,
            options: groupedOptions[question.id] || [] // Default to an empty array if no options are found
          }));

          // Return module details along with the quiz and its questions + options
          return res.json({
            module: moduleRow,
            quiz: {
              ...quizRow,
              questions: questionsWithOptions
            }
          });
        });
      });
    });
  });
};
