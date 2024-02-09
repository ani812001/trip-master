const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'mydatabase',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Route to validate username and password
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Query to check username and password against the database
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

  // Execute the query
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.length > 0) {
        // Valid credentials
        res.status(200).json({ success: true, message: 'Login successful' });
      } else {
        // Invalid credentials
        res.status(401).json({ success: false, message: 'Invalid username or password' });
      }
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
