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
            )`, (err) => {
                if (err) console.error("Error creating users table:", err.message);
            });

            // Create modules table
            db.run(`CREATE TABLE IF NOT EXISTS modules (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                subject TEXT,
                grade INTEGER,
                no_questions INTEGER,
                enrolled_students INTEGER,
                creator_id INTEGER NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (creator_id) REFERENCES users(id)
            )`, (err) => {
                if (err) console.error("Error creating modules table:", err.message);
            });

            // Insert sample data into the `modules` table only if it is empty
            db.get(`SELECT COUNT(*) as count FROM modules`, (err, row) => {
                if (err) {
                    console.error("Error counting modules:", err.message);
                } else if (row.count === 0) {
                    // Insert sample modules
                    db.run(`INSERT INTO modules (title, description, subject, grade, no_questions, enrolled_students, creator_id) VALUES 
                        ('Physics Fundamentals', 'Learn about the laws of motion.', 'PHYSICS', 8, 15, 48, 1),
                        ('World History', 'Understand key events in world history.', 'HISTORY', 4, 10, 7, 2)`, (err) => {
                        if (err) {
                            console.error("Error inserting sample modules:", err.message);
                        } else {
                            console.log("Sample modules inserted successfully.");
                        }
                    });
                } else {
                    console.log(`Modules table already has ${row.count} records.`);
                }
            });

            // Create quizzes table
            db.run(`CREATE TABLE IF NOT EXISTS quizzes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                module_id INTEGER NOT NULL,
                is_initial BOOLEAN NOT NULL DEFAULT 0,
                created_by INTEGER NOT NULL,
                generated_for_student_id INTEGER,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (module_id) REFERENCES modules(id),
                FOREIGN KEY (created_by) REFERENCES users(id),
                FOREIGN KEY (generated_for_student_id) REFERENCES users(id)
            )`, (err) => {
                if (err) console.error("Error creating quizzes table:", err.message);
            });

            // Create questions table
            db.run(`CREATE TABLE IF NOT EXISTS questions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                quiz_id INTEGER NOT NULL,
                question_text TEXT NOT NULL,
                hint TEXT,
                FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
            )`, (err) => {
                if (err) console.error("Error creating questions table:", err.message);
            });

            // Create answer_options table
            db.run(`CREATE TABLE IF NOT EXISTS answer_options (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                question_id INTEGER NOT NULL,
                option_text TEXT NOT NULL,
                is_correct BOOLEAN NOT NULL DEFAULT 0,
                FOREIGN KEY (question_id) REFERENCES questions(id)
            )`, (err) => {
                if (err) console.error("Error creating answer_options table:", err.message);
            });

            // Create student_quiz_assignments table
            db.run(`CREATE TABLE IF NOT EXISTS student_quiz_assignments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                student_id INTEGER NOT NULL,
                quiz_id INTEGER NOT NULL,
                assigned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (student_id) REFERENCES users(id),
                FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
            )`, (err) => {
                if (err) console.error("Error creating student_quiz_assignments table:", err.message);
            });

            // Create quiz_attempts table
            db.run(`CREATE TABLE IF NOT EXISTS quiz_attempts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                student_id INTEGER NOT NULL,
                quiz_id INTEGER NOT NULL,
                attempt_number INTEGER NOT NULL,
                started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                completed_at DATETIME,
                score REAL,
                FOREIGN KEY (student_id) REFERENCES users(id),
                FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
            )`, (err) => {
                if (err) console.error("Error creating quiz_attempts table:", err.message);
            });

            // Create student_answers table
            db.run(`CREATE TABLE IF NOT EXISTS student_answers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                quiz_attempt_id INTEGER NOT NULL,
                question_id INTEGER NOT NULL,
                selected_option_id INTEGER NOT NULL,
                FOREIGN KEY (quiz_attempt_id) REFERENCES quiz_attempts(id),
                FOREIGN KEY (question_id) REFERENCES questions(id),
                FOREIGN KEY (selected_option_id) REFERENCES answer_options(id)
            )`, (err) => {
                if (err) console.error("Error creating student_answers table:", err.message);
            });

            resolve();
        });
    });
};

// Export the database connection and setupDatabase function
module.exports = { db, setupDatabase };
