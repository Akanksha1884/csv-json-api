import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { parseCSVtoJSON } from './parser.js';
import { insertUsers, calculateAgeDistribution } from './utils.js';
import pool, { ensureTables } from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT 1+1 AS result');
    res.json({ ok: true, db: result.rows[0] });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.get('/upload', async (req, res) => {
  try {
    const data = parseCSVtoJSON();
    await insertUsers(data);
    await calculateAgeDistribution();
    res.send('Data uploaded successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error occurred: ' + err.message);
  }
});

app.listen(PORT, async () => {
  try {
    await ensureTables();
    console.log(`Server running on port ${PORT}`);
    console.log('GET /upload to parse CSV and upload to DB');
  } catch (err) {
    console.error('Failed to ensure tables:', err);
  }
});
