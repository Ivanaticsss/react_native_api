import express from 'express';
import type { Express, Request, Response } from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import crypto from 'crypto';

const app: Express = express();
const PORT = 3000;
const myIP = '10.0.64.180';

app.use(cors());
app.use(express.json());

// MySQL Pool Configuration
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sample_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Helper function for MD5 hashing
function md5Hash(text: string): string {
  return crypto.createHash('md5').update(text).digest('hex');
}

// Health check
app.get('/api/test', (req: Request, res: Response) => {
  const oras = new Date().toISOString();
  res.json({ status: 'Buhay ang Node.js backend ko!', oras });
});

// Login endpoint
app.post('/api/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const connection = await pool.getConnection();
    const [rows]: any = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    connection.release();

    if (rows.length === 0) {
      return res.status(400).json({ success: false, message: 'Wrong email or password.' });
    }

    const user = rows[0];
    const hashedPassword = md5Hash(password);

    if (hashedPassword !== user.password) {
      return res.status(400).json({ success: false, message: 'Wrong email or password.' });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Register endpoint
app.post('/api/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = md5Hash(password);

    const connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, NOW())',
      [name, email, hashedPassword]
    );
    connection.release();

    res.status(201).json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all users
app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection();
    const [rows]: any = await connection.query('SELECT id, name, email, created_at FROM users');
    connection.release();

    // total added so the dashboard's "Total Registered Member" counter works
    res.json({ success: true, users: rows, total: rows.length });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running at http://${myIP}:${PORT}`);
  console.log(`Health check: http://${myIP}:${PORT}/api/test`);
});