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
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "password",
};

const db = pgp(dbConfig);

app.get('/api/data', async (req, res) => {
    try {
        const data = await db.any('SELECT id, name, specialty, to_char(schedule, \'YYYY-MM-DD\') as formatted_date FROM doctor');
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(8005, () => {
  console.log(`Server is running on port 8005.`);
});