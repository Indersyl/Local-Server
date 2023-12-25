// server.js
const express = require('express');
const cors = require('cors');
const pgp = require('pg-promise')();
const app = express();


app.use(express.json());
app.use(cors());
const port = 8007; // Change the port to 8006


const dbConfig = {
    host: "localhost",     // e.g., localhost
    port: 5432,             // PostgreSQL default port
    database: "postgres",   // Your database name
    user: "postgres",     // Your database username
    password: "password", // Your database password
  // Your database configuration
};

const db = pgp(dbConfig);

app.get('/api/data', async (req, res) => {
  try {
    const data = await db.any('SELECT * FROM patient2');
    res.json(data);
  } catch (error) {
    console.error('Database Error:', error.message || error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/data', async (req, res) => {
  const { id, name, phone, service } = req.body;
  try {
    console.log('Received data:', {id, name, phone, service });
    // Insert data into the database
    const result = await db.one('INSERT INTO patient2 (id, name, phone, service) VALUES ($1, $2, $3, $4) RETURNING *', [id, name, phone, service]);
    
    res.json(result);
  } catch (error) {
    console.error('Database Error:', error.message || error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
