const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const db = require("./db"); // conexión SQLite

const app = express();
app.use(express.json());
app.use(cors());

/* ==========================
      LOGIN
========================== */
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
    if (err) return res.status(500).json({ error: "Error interno" });
    if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

    const passOk = await bcrypt.compare(password, user.password);
    if (!passOk) return res.status(400).json({ error: "Contraseña incorrecta" });

    res.json({
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  });
});

/* ==========================
      CRUD USERS
========================== */
app.get("/api/users", (req, res) => {
  db.all("SELECT id, username, role FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/api/users", async (req, res) => {
  const { username, password, role } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  db.run(
    "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
    [username, hashed, role],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, username, role });
    }
  );
});

/* ==========================
      CRUD PLAYERS
========================== */
app.get("/api/players", (req, res) => {
  db.all("SELECT * FROM players", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/api/players", (req, res) => {
  const { name, position, nationality, price } = req.body;

  db.run(
    "INSERT INTO players (name, position, nationality, price) VALUES (?, ?, ?, ?)",
    [name, position, nationality, price],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, name, position, nationality, price });
    }
  );
});

/* ==========================
      CRUD MATCHES
========================== */
app.get("/api/matches", (req, res) => {
  db.all("SELECT * FROM matches", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/api/matches", (req, res) => {
  const { date, opponent } = req.body;

  db.run(
    "INSERT INTO matches (date, opponent) VALUES (?, ?)",
    [date, opponent],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, date, opponent });
    }
  );
});

/* ==========================
      CHAT
========================== */
app.get("/api/messages", (req, res) => {
  db.all("SELECT * FROM messages", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/api/messages", (req, res) => {
  const { sender, receiver, text } = req.body;

  db.run(
    "INSERT INTO messages (sender, receiver, text) VALUES (?, ?, ?)",
    [sender, receiver, text],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, sender, receiver, text });
    }
  );
});

/* ==========================
   API EXTERNA (SIMULADA)
========================== */
function calcularPrecioJugador(p) {
  let precio = 50000;

  if (p.edad) precio += (35 - p.edad) * 1500;
  if (p.goles) precio += p.goles * 3000;
  if (p.partidos) precio += p.partidos * 800;
  if (p.altura) precio += (p.altura - 165) * 90;

  return Math.max(precio, 20000);
}

// ===========================================
// JUGADORES EXTERNOS (FAKE API)
// ===========================================
/* ==========================
/* ==========================
   API EXTERNA COMPLETA ASCENSO
========================== */
app.get("/api/full-external-players", (req, res) => {
  const players = [
    // DELANTEROS
    { name: "Luciano Pons", club: "Temperley", position: "Delantero", age: 33, goals: 8, height: 178, price: 420000 },
    { name: "Franco Toloza", club: "Almirante Brown", position: "Delantero", age: 31, goals: 12, height: 183, price: 520000 },
    { name: "Tomás Sandoval", club: "Chacarita", position: "Delantero", age: 25, goals: 11, height: 182, price: 500000 },

    // MEDIOS
    { name: "Ezequiel Vidal", club: "Defensores de Belgrano", position: "Mediocampista", age: 30, goals: 4, height: 170, price: 310000 },
    { name: "Leandro Vella", club: "San Martín SJ", position: "Extremo", age: 27, goals: 3, height: 175, price: 330000 },
    { name: "Rodrigo Insúa", club: "Chacarita", position: "Mediocampista", age: 24, goals: 1, height: 176, price: 260000 },

    // DEFENSORES
    { name: "Gastón Suso", club: "Estudiantes BA", position: "Defensor", age: 29, goals: 2, height: 186, price: 280000 },
    { name: "Lucas Monzón", club: "Quilmes", position: "Defensor", age: 22, goals: 0, height: 190, price: 240000 },
    { name: "Matías Pardo", club: "Almagro", position: "Lateral", age: 25, goals: 0, height: 173, price: 170000 },

    // ARQUEROS
    { name: "Ignacio Arce", club: "Deportivo Riestra", position: "Arquero", age: 32, goals: 0, height: 185, price: 300000 },
    { name: "Fernando Monetti", club: "Ferro", position: "Arquero", age: 35, goals: 0, height: 190, price: 350000 },
    { name: "Marcos Díaz", club: "All Boys", position: "Arquero", age: 36, goals: 0, height: 183, price: 330000 },
    { name: "Leandro Brey", club: "Güemes", position: "Arquero", age: 22, goals: 0, height: 188, price: 250000 }
  ];

  res.json(players);
});


/* ==========================
      SERVER LISTEN
========================== */
app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
