module.exports = async (req, res) => {
    const quiz = {
        quiz: [
            {
                question_id: "1",
                question: "multiple choice",
                options: ["option1", "option2", "option3", "option4"],
                correct_answer: "option2",
                hint: "Probably answer 2 is correct :)",
            },
            {
                question_id: "2",
                question: "multiple choice",
                options: ["option1", "option2", "option3", "option4"],
                correct_answer: "option3",
                hint: "Probably answer 3 is correct :)",
            },
            {
                question_id: "3",
                question: "multiple choice",
                options: ["option1", "option2", "option3", "option4"],
                correct_answer: "option4",
                hint: "Probably answer 3 is correct :)",
            },
        ],
    };
    res.json(quiz);
};
