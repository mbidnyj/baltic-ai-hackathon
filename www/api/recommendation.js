module.exports = async (req, reqres) => {
    const userId = req.params.userId;
    const moduleId = req.params.moduleId;
    if (userId == "1") {
        const recommendation = {
            personalized_text_rec: "PERSONALIZED TEXT RECOMMENDATION",
            personalized_flashcard_rec: {
                back: "PERSONALIZED FLASHCARD BACK",
                front: "PERSONALIZED FLASHCARD FRONT",
            },
        };
        res.json(recommendation);
    } else {
        const recommendation = {
            personalized_studying_materials: "NEW PERSONALIZED MATERIAL",
            personalized_quiz: [
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
                    hint: "Probably answer 4 is correct :)",
                },
            ],
        };
        res.json(recommendation);
    }
};
