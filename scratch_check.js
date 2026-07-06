require('dotenv').config();
const { Client } = require('pg');
const client = new Client({ connectionString: process.env.DIRECT_URL });
async function run() {
  await client.connect();
  const res = await client.query('SELECT * FROM "EmailMessage" ORDER BY "createdAt" DESC LIMIT 5;');
  console.log(JSON.stringify(res.rows, null, 2));
  await client.end();
}
run().catch(console.error);
