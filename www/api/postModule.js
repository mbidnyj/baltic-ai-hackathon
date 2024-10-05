const { db } = require("../integrations/dbModule");
const pdf = require("pdf-parse");
const prompt_groq_text = require("../lama");

module.exports = async (req, res) => {
    console.log("Received request to /api/module");
    console.log("Request body:", req.body);

    const { title, description, creatorId } = req.body;

    if (!title || !description || !creatorId) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields (title, description, creatorId)",
        });
    }

    const insertQuery = `INSERT INTO modules (title, description, creator_id) VALUES (?, ?, ?)`;
    const insertParams = [title, description, creatorId];

    db.run(insertQuery, insertParams, async function (err) {
        if (err) {
            console.error("Error inserting module:", err.message);
            return res.status(500).json({
                success: false,
                message: "Failed to create module",
            });
        }

        const moduleId = this.lastID;

        const prompt = `Read studying materials provided for the students:
Newton's Laws of Motion - Study Guide
Introduction
Newton's Laws of Motion are fundamental principles that describe how objects move and interact
with forces. There are three laws that help explain how and why objects move the way they do.
These laws were developed by Sir Isaac Newton in the 17th century and are still used today to
understand the motion of everything from planets to cars to the ball you throw during gym class.
Newton's First Law of Motion: The Law of Inertia
Definition:
An object at rest stays at rest, and an object in motion stays in motion with the same speed and in
the same direction unless acted upon by an unbalanced force.
Explanation:
This law tells us that objects don't change their motion unless something forces them to. This
tendency of objects to resist changes in their state of motion is called inertia.
Examples:
1. A book resting on a table will remain there until you pick it up or push it.
2. A soccer ball will continue rolling across the field unless friction with the ground or a player
changes it.
Newton's Second Law of Motion: The Law of Force and Acceleration
Definition:
The acceleration of an object depends on the mass of the object and the amount of force applied.
Mathematically: Force = Mass × Acceleration (F = ma)
Explanation:
This law explains how the motion of an object changes when a force is applied. The greater the
force applied to an object, the more it will accelerate.
Examples:
1. If you push a shopping cart with a small amount of force, it will move slowly. More force = faster
movement.
2. If you're pushing a heavy box and a light box with the same force, the lighter one will move faster.
Newton's Third Law of Motion: Action and Reaction
Definition:
For every action, there is an equal and opposite reaction.
Explanation:
Forces always come in pairs. Whenever one object exerts a force on a second object, the second
object exerts an equal force back on the first, but in the opposite direction.
Examples:
1. When you jump off a diving board, you push down, and the board pushes you up.
2. When you paddle a canoe, the paddle pushes the water, and the water pushes the canoe
forward.
Conclusion
Newton's Laws of Motion are key to understanding how the world around us works. They help
explain why objects move the way they do and are fundamental in understanding everyday physics.

Task:
Fill valid json file with placeholders for questions and answers based on studying materials given. You are not allowed to change file structure. Output pure json file without any further modifications or comments before and after. Just Pure file!
Json template:
{
    "quiz": [
        {
            "question_id": "1",
            "question_type": "single_choice_answer",
            "question": "<question itself/>",
            "options": [
                "<option1/>",
                "<option2/>",
                "<option3/>",
                "<option4/>"
            ],
            "correct_answer": "<some option/>",
            "hint": "<some hint based on the studying materials provided/>"
        },
        {
            "question_id": "2",
            "question_type": "single_choice_answer",
            "question": "<question itself/>",
            "options": [
                "<option1/>",
                "<option2/>",
                "<option3/>",
                "<option4/>"
            ],
            "correct_answer": "<some option/>",
            "hint": "<some hint based on the studying materials provided/>"
        },
        {
            "question_id": "3",
            "question_type": "single_choice_answer",
            "question": "<question itself/>",
            "options": [
                "<option1/>",
                "<option2/>",
                "<option3/>",
                "<option4/>"
            ],
            "correct_answer": "<some option/>",
            "hint": "<some hint based on the studying materials provided/>"
        },
        {
            "question_id": "4",
            "question_type": "single_choice_answer",
            "question": "<question itself/>",
            "options": [
                "<option1/>",
                "<option2/>",
                "<option3/>",
                "<option4/>"
            ],
            "correct_answer": "<some option/>",
            "hint": "<some hint based on the studying materials provided/>"
        },
        {
            "question_id": "5",
            "question_type": "single_choice_answer",
            "question": "<question itself/>",
            "options": [
                "<option1/>",
                "<option2/>",
                "<option3/>",
                "<option4/>"
            ],
            "correct_answer": "<some option/>",
            "hint": "<some hint based on the studying materials provided/>"
        },
        {
            "question_id": "6",
            "question_type": "single_choice_answer",
            "question": "<question itself/>",
            "options": [
                "<option1/>",
                "<option2/>",
                "<option3/>",
                "<option4/>"
            ],
            "correct_answer": "<some option/>",
            "hint": "<some hint based on the studying materials provided/>"
        },
        {
            "question_id": "7",
            "question_type": "single_choice_answer",
            "question": "<question itself/>",
            "options": [
                "<option1/>",
                "<option2/>",
                "<option3/>",
                "<option4/>"
            ],
            "correct_answer": "<some option/>",
            "hint": "<some hint based on the studying materials provided/>"
        },
        {
            "question_id": "8",
            "question_type": "single_choice_answer",
            "question": "<question itself/>",
            "options": [
                "<option1/>",
                "<option2/>",
                "<option3/>",
                "<option4/>"
            ],
            "correct_answer": "<some option/>",
            "hint": "<some hint based on the studying materials provided/>"
        },
        {
            "question_id": "9",
            "question_type": "single_choice_answer",
            "question": "<question itself/>",
            "options": [
                "<option1/>",
                "<option2/>",
                "<option3/>",
                "<option4/>"
            ],
            "correct_answer": "<some option/>",
            "hint": "<some hint based on the studying materials provided/>"
        },
        {
            "question_id": "10",
            "question_type": "single_choice_answer",
            "question": "<question itself/>",
            "options": [
                "<option1/>",
                "<option2/>",
                "<option3/>",
                "<option4/>"
            ],
            "correct_answer": "<some option/>",
            "hint": "<some hint based on the studying materials provided/>"
        },
    ]
}`;

        try {
            const result = await prompt_groq_text(prompt, true);

            res.status(200).json(result);
        } catch (error) {
            console.error("Error generating quiz:", error.message);
            res.status(500).json({
                success: false,
                message: "Error generating quiz",
                error: error.message,
            });
        }
    });
};
