const fs = require("fs");
const path = require("path");

module.exports = async (req, res) => {
    try {
        const { id } = req.params;

        // Define the path to the JSON file
        const filePath = path.resolve(__dirname, `../generated_quizzes/quiz_${id}.json`);

        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: "Quiz not found" });
        }

        // Read the file from local storage
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                console.error("Error reading the file:", err);
                return res.status(500).json({ error: "Failed to read the quiz file" });
            }

            // Parse the JSON file
            try {
                const quiz = JSON.parse(data);
                // Send the JSON content as the response
                return res.status(200).json(quiz);
            } catch (parseErr) {
                console.error("Error parsing the file:", parseErr);
                return res.status(500).json({ error: "Failed to parse the quiz file" });
            }
        });
    } catch (error) {
        console.error("Error in fetching the quiz:", error);
        return res.status(500).json({ error: "An internal error occurred" });
    }
};
