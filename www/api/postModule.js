const { db } = require("../integrations/dbModule");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;
const pdf = require("pdf-parse");
const { prompt_groq_text } = require("../lama");

const upload = multer({
    dest: "uploads/",
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are allowed"), false);
        }
    },
}).single("studyMaterial");

module.exports = async (req, res) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({
                success: false,
                message: "File upload error",
            });
        } else if (err) {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }

        const { title, description, creatorId } = req.body;
        const studyMaterialPath = req.file ? req.file.path : null;

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

            db.run(
                `INSERT INTO quizzes (module_id, is_initial, created_by) VALUES (?, ?, ?)`,
                [moduleId, 1, creatorId],
                async function (err) {
                    if (err) {
                        console.error("Error inserting quiz:", err.message);
                        return res.status(500).json({
                            success: false,
                            message: "Failed to create quiz",
                        });
                    }

                    const quizId = this.lastID;

                    if (studyMaterialPath) {
                        console.log(`File received and saved: ${studyMaterialPath}`);

                        try {
                            const dataBuffer = await fs.readFile(studyMaterialPath);
                            const data = await pdf(dataBuffer);
                            console.log("PDF Text Content:");
                            console.log(data.text);

                            const prompt = `Read studying materials provided for the students:
${data.text}
Task:
Fill valid json file with placeholders for questions and answers based on studying materials given. You are not allowed to change file structure. Output pure json file without any futher modifications any commented before and after. Just Pure file!
Json template:
{
    "quiz": [
        {
            "question_id": "1",
            "question_type": "single_choice_answer",
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
            "options": [
                "<option1/>",
                "<option2/>",
                "<option3/>",
                "<option4/>"
            ],
            "correct_answer": "<some option/>",
            "hint": "<some hint based on the studying materials provided/>"
        }
    ]
}`;

                            const result = await prompt_groq_text(prompt, true);
                            const generatedQuiz = result.message.content;

                            // Save the generated quiz to a local file
                            const quizFilePath = path.join(__dirname, "..", "generated_quizzes", `quiz_${quizId}.json`);
                            await fs.mkdir(path.dirname(quizFilePath), { recursive: true });
                            await fs.writeFile(quizFilePath, generatedQuiz);

                            res.status(201).json({
                                success: true,
                                message: "Module and quiz created successfully",
                                moduleId: moduleId,
                                quizId: quizId,
                                generatedQuiz: JSON.parse(generatedQuiz),
                            });
                        } catch (error) {
                            console.error("Error processing PDF or generating quiz:", error.message);
                            res.status(500).json({
                                success: false,
                                message: "Error processing PDF or generating quiz",
                                error: error.message,
                            });
                        }
                    } else {
                        res.status(201).json({
                            success: true,
                            message: "Module and quiz created successfully (no study material provided)",
                            moduleId: moduleId,
                            quizId: quizId,
                        });
                    }
                }
            );
        });
    });
};
