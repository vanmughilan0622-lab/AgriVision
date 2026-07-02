import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import fs from 'fs';

neonConfig.webSocketConstructor = ws;

async function run() {
  const connectionString = "postgresql://neondb_owner:npg_J9sQEALK8Wqv@ep-delicate-unit-at94xlm8-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require";
  const pool = new Pool({ connectionString });
  
  try {
    const sql = fs.readFileSync('migration.sql', 'utf8');
    console.log("Executing SQL...");
    await pool.query(sql);
    console.log("Migration executed successfully!");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await pool.end();
  }
}

run();
