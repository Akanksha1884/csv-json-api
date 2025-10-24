import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

// Very small CSV parser that handles basic trimming and nested headers (header.key)
export function parseCSVtoJSON() {
  const filePath = process.env.CSV_PATH || './data/users.csv';
  const raw = fs.readFileSync(filePath, 'utf8').trim();
  if (!raw) return [];

  const lines = raw.split(/\r?\n/).filter(Boolean);
  const headers = lines[0].split(',').map(h => h.trim());

  const rows = lines.slice(1).map(line => {
    // naive split on comma (works for this challenge's simple CSV)
    const values = line.split(',').map(v => v.trim());
    const obj = {};

    headers.forEach((header, idx) => {
      const val = values[idx] ?? '';
      const parts = header.split('.');
      let cur = obj;
      for (let i = 0; i < parts.length; i++) {
        const key = parts[i];
        if (i === parts.length - 1) {
          cur[key] = val;
        } else {
          cur[key] = cur[key] || {};
          cur = cur[key];
        }
      }
    });

    return obj;
  });

  return rows;
}
