const express = require('express');
const cors = require('cors');
const pgp = require('pg-promise')();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/message', (req, res) => {
    res.json({ message: "Hello from server!" });
});

// Database connection details
const dbConfig = {
    host: "localhost",     // e.g., localhost
    port: 5432,             // PostgreSQL default port
    database: "postgres",   // Your database name
    user: "postgres",     // Your database username
    password: "password", // Your database password
};

const db = pgp(dbConfig);

app.get('/api/data', async (req, res) => {
    try {
        const data = await db.any('SELECT * FROM patient2');
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
    console.log(`this part works`)
});

app.listen(8004, () => {
  console.log(`Server is running on port 8004.`);
});