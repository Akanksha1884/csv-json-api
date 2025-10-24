import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Ensure users table exists
export async function ensureTables() {
  const create = `
  CREATE TABLE IF NOT EXISTS public.users (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    age INT NOT NULL,
    address JSONB,
    additional_info JSONB
  );
  `;
  await pool.query(create);
}

export default pool;
