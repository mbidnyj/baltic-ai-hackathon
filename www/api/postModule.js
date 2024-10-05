const { db } = require("../integrations/dbModule"); // Import the SQLite database connection

module.exports = async (req, res) => {
  // Extract the module information from the request body
  const { title, description, creatorId, questionCount, questionType } = req.body;

  // Validate required fields
  if (!title || !description || !creatorId) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields (title, description, creatorId)",
    });
  }

  // Start the database insertion
  db.serialize(() => {
    // Step 2: Insert the module into the `modules` table
    db.run(
      `INSERT INTO modules (title, description, creator_id) VALUES (?, ?, ?)`,
      [title, description, creatorId],
      function (err) {
        if (err) {
          console.error("Error inserting module:", err.message);
          return res.status(500).json({
            success: false,
            message: "Failed to create module",
          });
        }

        const moduleId = this.lastID; // The newly inserted module's ID

        // Step 3: Insert a quiz for the module into the `quizzes` table
        db.run(
          `INSERT INTO quizzes (module_id, is_initial, created_by) VALUES (?, ?, ?)`,
          [moduleId, 1, creatorId],
          function (err) {
            if (err) {
              console.error("Error inserting quiz:", err.message);
              return res.status(500).json({
                success: false,
                message: "Failed to create quiz",
              });
            }

            const quizId = this.lastID; // The newly inserted quiz's ID

            // Optionally, insert questions and answer options here

            // Step 4: Send a response with the created module and quiz IDs
            res.status(201).json({
              success: true,
              message: "Module and quiz created successfully",
              moduleId: moduleId,
              quizId: quizId,
            });
          }
        );
      }
    );
  });
};
