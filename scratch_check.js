require('dotenv').config();
const { Client } = require('pg');
const client = new Client({ connectionString: process.env.DIRECT_URL });
async function run() {
  await client.connect();
  await client.query('DELETE FROM "EmailMessage" WHERE body LIKE \'%Body not found%\' OR body = \'<p></p>\';');
  console.log('Cleaned up bad messages');
  await client.end();
}
run().catch(console.error);
