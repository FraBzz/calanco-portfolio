// scripts/genera-comuni-json.js
import fs from 'fs';
import https from 'https';

const url = 'https://raw.githubusercontent.com/matteocontrini/comuni-json/master/comuni.json';

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const raw = JSON.parse(data);
    const snellito = raw.map(comune => ({
      name: comune.nome,
      country_code: 'IT'
    }));

    fs.writeFileSync('src/data/comuni_italiani.json', JSON.stringify(snellito, null, 2), 'utf-8');
    console.log(`✅ Salvato comuni_italiani.json con ${snellito.length} comuni`);
  });
}).on('error', err => {
  console.error('Errore durante il download:', err.message);
});
