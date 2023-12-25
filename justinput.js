const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3003;

// Replace these with your PostgreSQL database credentials
const pool = new Pool({
    host: "localhost",     // e.g., localhost
    port: 5432,             // PostgreSQL default port
    database: "postgres",   // Your database name
    user: "postgres",     // Your database username
    password: "password", // Your database password
});

app.use(express.urlencoded({ extended: true }));

// HTML form to take four inputs
const inputForm = `
  <form method="post" action="/insert">
      <label for="id">Entry Number:</label>
      <input type="text" name="id" required><br>
      <label for="name">Name:</label>
      <input type="text" name="name" required><br>
      <label for="phone">Phone Number:</label>
      <input type="text" name="phone" required><br>
      <label for="service">Service Needed:</label>
      <input type="text" name="service" required><br>
      <button type="submit">Submit</button>
  </form>
`;

// Route to display the form
app.get('/', (req, res) => {
  res.send(inputForm);
});

// Route to handle form submission and insert data into the database
app.post('/insert', async (req, res) => {
  const { id, name, phone, service } = req.body;

  // Insert data into the database
  const query = 'INSERT INTO patient2 (id, name, phone, service) VALUES ($1, $2, $3, $4)';
  await pool.query(query, [id, name, phone, service]);

  res.send(`Data inserted into the database successfully!`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});