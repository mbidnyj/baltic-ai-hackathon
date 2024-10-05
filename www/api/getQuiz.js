module.exports = async (req, res) => {
    const { moduleId } = req.query;
  
    // Define two module instances, each with details and an associated quiz
    const modules = {
      module1: {
        module_id: 1,
        title: "Physics Fundamentals",
        subject: "PHYSICS",
        description: "Learn about the laws of motion and forces.",
        quiz: {
          questions: [
            {
              question_id: "1",
              question: "What is Newton's First Law?",
              options: [
                "An object in motion stays in motion",
                "For every action, there is an equal and opposite reaction",
                "Force equals mass times acceleration",
                "Objects at rest stay at rest unless acted upon"
              ],
              correct_answer: "An object in motion stays in motion",
              hint: "It describes inertia",
            },
            {
              question_id: "2",
              question: "What is the unit of force?",
              options: ["Newton", "Joule", "Watt", "Pascal"],
              correct_answer: "Newton",
              hint: "Named after a famous physicist.",
            },
            {
              question_id: "3",
              question: "Which of the following is an example of potential energy?",
              options: [
                "A rolling ball",
                "A car moving on a road",
                "A book placed on a shelf",
                "Water flowing in a river"
              ],
              correct_answer: "A book placed on a shelf",
              hint: "Stored energy is called potential energy.",
            },
          ],
        },
      },
      module2: {
        title: "World History",
        subject: "HISTORY",
        description: "Understand key events in world history.",
        quiz: {
          questions: [
            {
              question_id: "1",
              question: "Who was the first President of the United States?",
              options: [
                "Abraham Lincoln",
                "George Washington",
                "Thomas Jefferson",
                "John Adams"
              ],
              correct_answer: "George Washington",
              hint: "Known as the 'Father of His Country'.",
            },
            {
              question_id: "2",
              question: "What year did World War II begin?",
              options: ["1914", "1939", "1945", "1963"],
              correct_answer: "1939",
              hint: "It started with the invasion of Poland.",
            },
            {
              question_id: "3",
              question: "Which empire was known as the 'Empire on which the sun never sets'?",
              options: [
                "Roman Empire",
                "British Empire",
                "Ottoman Empire",
                "Mongol Empire"
              ],
              correct_answer: "British Empire",
              hint: "It was the largest empire in history.",
            },
          ],
        },
      },
    };
  
    // Find the module by moduleId
    const moduleQuiz = modules[moduleId];
  
    // If module is not found, return 404
    if (!moduleQuiz) {
      return res.status(404).json({ error: "Module not found" });
    }
  
    // Return the moduleQuiz data as JSON
    res.json(moduleQuiz);
  };
  