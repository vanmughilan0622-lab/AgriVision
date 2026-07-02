const { execSync } = require('child_process');

const url = 'postgresql://neondb_owner:npg_J9sQEALK8Wqv@ep-delicate-unit-at94xlm8.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require';

function addEnv(env) {
    try {
        console.log(`Adding to ${env}...`);
        execSync(`npx vercel env add MY_REAL_DB_URL ${env}`, { input: url, encoding: 'utf8' });
        console.log(`Success: ${env}`);
    } catch (e) {
        console.error(`Error adding to ${env}:`, e.message);
    }
}

addEnv('production');
addEnv('preview');
addEnv('development');
