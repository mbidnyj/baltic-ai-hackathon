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

// Function to populate the database with synthetic data
const populateDb = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            // Create topics table
            db.run(`CREATE TABLE IF NOT EXISTS topics (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                emoji TEXT NOT NULL,
                category TEXT NOT NULL,
                podcastCdnUrl TEXT,
                podcast TEXT,
                tag TEXT DEFAULT 'other',
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )`);

            // Insert synthetic data
            const stmt = db.prepare(
                `INSERT INTO topics (title, description, emoji, category, tag) VALUES (?, ?, ?, ?, ?)`
            );

            const syntheticData = [
                ["AI in Healthcare", "Exploring the impact of AI on modern healthcare", "🏥", "Technology", "ai"],
                [
                    "Climate Change Solutions",
                    "Innovative approaches to combat global warming",
                    "🌍",
                    "Environment",
                    "climate",
                ],
                ["Space Exploration", "Latest developments in space technology and missions", "🚀", "Science", "space"],
                [
                    "Quantum Computing",
                    "Understanding the principles and potential of quantum computers",
                    "💻",
                    "Technology",
                    "quantum",
                ],
                ["Renewable Energy", "Advancements in sustainable energy sources", "🌞", "Environment", "energy"],
            ];

            syntheticData.forEach((data) => {
                stmt.run(data, (err) => {
                    if (err) console.error("Error inserting data:", err.message);
                });
            });

            stmt.finalize();

            db.all("SELECT * FROM topics", [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    console.log("Synthetic data populated:", rows);
                    resolve();
                }
            });
        });
    });
};

// Export the database connection and populateDb function
module.exports = { db, populateDb };
