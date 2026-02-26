const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const outDir = path.join(__dirname, '..', 'backups');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const filePath = path.join(outDir, `backup-${stamp}.sql`);
execSync(`pg_dump "${process.env.DATABASE_URL}" -f "${filePath}"`, { stdio: 'inherit' });
console.log(`Backup gerado em: ${filePath}`);
