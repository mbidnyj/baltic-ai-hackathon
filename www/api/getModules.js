const { db } = require("../integrations/dbModule"); // Import your SQLite connection

module.exports = async (req, res) => {
  const query = `SELECT * FROM modules`; // Modify this query based on your database structure

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Failed to fetch modules' });
    }

    // Send the modules data back to the frontend
    res.status(200).json(rows);
  });
};
