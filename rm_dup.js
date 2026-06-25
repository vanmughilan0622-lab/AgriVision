const fs = require('fs');
const content = fs.readFileSync('src/lib/i18n.ts', 'utf8');
const lines = content.split('\n');
const keys = new Set();
let duplicates = [];
lines.forEach((line, i) => {
    const match = line.match(/^\s*"([^"\n]+)"\s*:/);
    if(match) {
        if(keys.has(match[1])) {
            duplicates.push({key: match[1], line: i});
        }
        keys.add(match[1]);
    }
});

let fixLines = lines.filter((line, i) => !duplicates.some(d => d.line === i));
fs.writeFileSync('src/lib/i18n.ts', fixLines.join('\n'));
console.log('Removed duplicates:', duplicates.map(d => d.key));
