const { db } = require("../integrations/dbModule");
const pdf = require("pdf-parse");
const prompt_groq_text = require("../lama");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const upload = multer({ dest: "uploads/" });

module.exports = [
    upload.single("file"),
    async (req, res) => {
        console.log("Received request to /api/module");
        console.log("Request body:", req.body);

        const { title, description, creatorId } = req.body;

        if (!title || !description || !creatorId || !req.file) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields (title, description, creatorId, file)",
            });
        }

        const insertQuery = `INSERT INTO modules (title, description, grade, creator_id) VALUES (?, ?, ?, ?)`;
        const filePath = req.file.path;
        const insertParams = [title, description, creatorId, filePath];

        db.run(insertQuery, insertParams, async function (err) {
            if (err) {
                console.error("Error inserting module:", err.message);
                return res.status(500).json({
                    success: false,
                    message: "Failed to create module",
                });
            }

            const moduleId = this.lastID;

            try {
                const dataBuffer = fs.readFileSync(filePath);
                const pdfData = await pdf(dataBuffer);
                const pdfText = pdfData.text;

                const prompt = `Read studying materials provided for the students:
${pdfText}

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
                    const resultString = await prompt_groq_text(prompt, true);
                    const result = JSON.parse(resultString); // Parse the JSON string into an object

                    res.status(200).json({
                        success: true,
                        moduleId,
                        result, // Now result is an object
                    });
                } catch (error) {
                    console.error("Error generating quiz:", error.message);
                    res.status(500).json({
                        success: false,
                        message: "Error generating quiz",
                        error: error.message,
                    });
                }
            } catch (error) {
                console.error("Error processing PDF:", error.message);
                res.status(500).json({
                    success: false,
                    message: "Error processing PDF",
                    error: error.message,
                });
            }
        });
    },
];
