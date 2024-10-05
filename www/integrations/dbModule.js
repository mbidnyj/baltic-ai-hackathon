const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Define the path to your SQLite database file
const dbPath = path.resolve(__dirname, "../database.sqlite");

// Initialize the database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
    } else {
        console.log("Connected to the SQLite database.");
    }
});

// Function to set up the database schema
const setupDatabase = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            // Create users table
            db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                role TEXT NOT NULL CHECK(role IN ('student', 'teacher')),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`);

            // Create modules table
            db.run(`CREATE TABLE IF NOT EXISTS modules (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                grade INTEGER,
                creator_id INTEGER NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (creator_id) REFERENCES users(id)
            )`);

            // Create quizzes table
            db.run(`CREATE TABLE IF NOT EXISTS quizzes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                module_id INTEGER NOT NULL,
                is_initial BOOLEAN NOT NULL DEFAULT 0,
                question_count INTEGER,
                created_by INTEGER NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (module_id) REFERENCES modules(id),
                FOREIGN KEY (created_by) REFERENCES users(id)
            )`);

            // Create questions table
            db.run(`CREATE TABLE IF NOT EXISTS questions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                quiz_id INTEGER NOT NULL,
                question_text TEXT NOT NULL,
                hint TEXT,
                FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
            )`);

            // Create answer_options table
            db.run(`CREATE TABLE IF NOT EXISTS answer_options (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                question_id INTEGER NOT NULL,
                option_text TEXT NOT NULL,
                is_correct BOOLEAN NOT NULL DEFAULT 0,
                FOREIGN KEY (question_id) REFERENCES questions(id)
            )`);

            // Insert sample module, quiz, questions, and answers data
            db.run(`INSERT INTO modules (title, description, grade, creator_id) 
                    VALUES ('Physics Fundamentals', 'Learn about the laws of motion.', 8, 1)`);

            // Insert sample quiz for Physics module (module_id = 1)
            db.run(`INSERT INTO quizzes (module_id, is_initial, question_count, created_by) 
                    VALUES (1, 1, 5, 1)`); // Initial quiz for Physics

            // Insert sample questions for the Physics quiz (quiz_id = 1)
            db.run(`INSERT INTO questions (quiz_id, question_text, hint) 
                    VALUES (1, "What is Newton's First Law?", "It describes inertia.")`);
            
            db.run(`INSERT INTO questions (quiz_id, question_text, hint) 
                    VALUES (1, "What is the unit of force?", "Named after a famous physicist.")`);

            // Insert answer options for the first question
            db.run(`INSERT INTO answer_options (question_id, option_text, is_correct) 
                    VALUES (1, "An object in motion stays in motion", 1)`); // Correct answer
            db.run(`INSERT INTO answer_options (question_id, option_text, is_correct) 
                    VALUES (1, "Force equals mass times acceleration", 0)`);
            db.run(`INSERT INTO answer_options (question_id, option_text, is_correct) 
                    VALUES (1, "For every action, there is an equal and opposite reaction", 0)`);
            db.run(`INSERT INTO answer_options (question_id, option_text, is_correct) 
                    VALUES (1, "Objects at rest stay at rest unless acted upon", 0)`);

            // Insert answer options for the second question
            db.run(`INSERT INTO answer_options (question_id, option_text, is_correct) 
                    VALUES (2, "Newton", 1)`); // Correct answer
            db.run(`INSERT INTO answer_options (question_id, option_text, is_correct) 
                    VALUES (2, "Joule", 0)`);
            db.run(`INSERT INTO answer_options (question_id, option_text, is_correct) 
                    VALUES (2, "Watt", 0)`);
            db.run(`INSERT INTO answer_options (question_id, option_text, is_correct) 
                    VALUES (2, "Pascal", 0)`);

            resolve();
        });
    });
};

// Export the database connection and setupDatabase function
module.exports = { db, setupDatabase };
