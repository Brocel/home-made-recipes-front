const fs = require('fs');
const path = require('path');

function flatten(obj, prefix = '') {
  return Object.keys(obj).reduce((acc, k) => {
    const val = obj[k];
    const key = prefix ? `${prefix}.${k}` : k;
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      Object.assign(acc, flatten(val, key));
    } else {
      acc[key] = val;
    }
    return acc;
  }, {});
}

const frPath = path.resolve('public/i18n/fr.json');
const ptPath = path.resolve('public/i18n/pt-BR.json');

if (!fs.existsSync(frPath) || !fs.existsSync(ptPath)) {
  console.error('Fichiers i18n manquants. Assure-toi que public/i18n/fr.json et pt-BR.json existent.');
  process.exit(2);
}

const fr = flatten(JSON.parse(fs.readFileSync(frPath, 'utf8')));
const pt = flatten(JSON.parse(fs.readFileSync(ptPath, 'utf8')));

const missingInPt = Object.keys(fr).filter(k => !(k in pt));
const missingInFr = Object.keys(pt).filter(k => !(k in fr));

if (missingInPt.length || missingInFr.length) {
  console.error('i18n mismatch detected:');
  if (missingInPt.length) console.error('  Missing in pt-BR:', missingInPt);
  if (missingInFr.length) console.error('  Missing in fr:', missingInFr);
  process.exit(1);
}

console.log('i18n OK — keys match between fr and pt-BR');
process.exit(0);
