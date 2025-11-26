const db = require('./db');
const bcrypt = require('bcryptjs');

async function seed() {
  const presidentePass = await bcrypt.hash('123', 10);
  const tecnicoPass = await bcrypt.hash('123', 10);

  db.run(`INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)`,
    ['presidente', presidentePass, 'admin'],
    (err) => err ? console.error(err.message) : console.log('Presidente creado o ya existe.')
  );

  db.run(`INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)`,
    ['tecnico', tecnicoPass, 'user'],
    (err) => err ? console.error(err.message) : console.log('Técnico creado o ya existe.')
  );
}

seed();
