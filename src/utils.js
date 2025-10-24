import pool, { ensureTables } from './db.js';

export async function insertUsers(users) {
  if (!users || users.length === 0) return;
  await ensureTables();

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const insertText = 'INSERT INTO users(name, age, address, additional_info) VALUES($1, $2, $3, $4)';

    for (const user of users) {
      // build name
      const first = user?.name?.firstName || '';
      const last = user?.name?.lastName || '';
      const name = `${first} ${last}`.trim();

      const age = parseInt(user.age) || 0;

      const address = user.address && Object.keys(user.address).length ? user.address : null;

      const additional = { ...user };
      delete additional.name;
      delete additional.age;
      delete additional.address;

      await client.query(insertText, [name, age, address, additional]);
    }

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

export async function calculateAgeDistribution() {
  const res = await pool.query('SELECT age FROM users');
  const ages = res.rows.map(r => r.age).filter(a => typeof a === 'number' && !isNaN(a));
  const total = ages.length || 1;
  const groups = { '<20': 0, '20-40': 0, '40-60': 0, '>60': 0 };

  ages.forEach(age => {
    if (age < 20) groups['<20']++;
    else if (age <= 40) groups['20-40']++;
    else if (age <= 60) groups['40-60']++;
    else groups['>60']++;
  });

  console.log('\nAge-Group     % Distribution');
  for (const [k,v] of Object.entries(groups)) {
    const pct = ((v / total) * 100).toFixed(2);
    console.log(k.padEnd(12), pct);
  }
}
