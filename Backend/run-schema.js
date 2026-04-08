const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

async function run() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set.');
  }

  const schemaPath = path.join(__dirname, '..', 'Database', 'Schema.sql');
  if (!fs.existsSync(schemaPath)) {
    throw new Error(`Schema file not found at ${schemaPath}`);
  }

  const sql = fs.readFileSync(schemaPath, 'utf8');
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  try {
    await client.query(sql);
    const result = await client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name"
    );

    console.log('Schema initialization completed. Public tables:');
    result.rows.forEach((row) => console.log(`- ${row.table_name}`));
  } finally {
    await client.end();
  }
}

run().catch((error) => {
  console.error('Schema initialization failed:', error.message);
  process.exit(1);
});
