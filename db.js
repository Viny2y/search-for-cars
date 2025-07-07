const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS anuncios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT,
      link TEXT,
      categoria TEXT,
      data TEXT
    )
  `);
});

function salvarAnuncio(titulo, link, categoria, data) {
  console.log(`Tentando salvar: ${titulo} | ${link} | ${categoria} | ${data}`);
  db.run(
    `INSERT INTO anuncios (titulo, link, categoria, data) VALUES (?, ?, ?, ?)`,
    [titulo, link, categoria, data],
    (err) => {
      if (err) console.error("Erro ao salvar:", err.message);
      else console.log(`[✔] Salvo: ${titulo}`);
    }
  );
}

module.exports = { salvarAnuncio };
