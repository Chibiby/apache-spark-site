const fs = require('fs');
const path = require('path');
const file = process.argv[2];
const b64 = process.argv[3];
const dir = path.dirname(file);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(file, Buffer.from(b64, 'base64').toString('utf8'), 'utf8');
console.log('Successfully wrote', file);