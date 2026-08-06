const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(express.json());
app.use(cors());


app.post("/api/auth/login", (req, res) => {

  const { username, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, user) => {

      if (err)
        return res.status(500).json({
          error: "Error interno"
        });

      if (!user)
        return res.status(400).json({
          error: "Usuario no encontrado"
        });

      const passOk =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!passOk)
        return res.status(400).json({
          error: "Contraseña incorrecta"
        });

      res.json({
        user: {
          id: user.id,
          username: user.username,
          role: user.role
        }
      });
    }
  );
});


app.get("/api/users", (req, res) => {

  db.all(
    "SELECT id, username, role FROM users",
    [],
    (err, rows) => {

      if (err)
        return res.status(500).json({
          error: err.message
        });

      res.json(rows);
    }
  );
});

app.post("/api/users", async (req, res) => {

  const {
    username,
    password,
    role
  } = req.body;

  try {

    const hashed =
      await bcrypt.hash(password, 10);

    db.run(
      `
      INSERT INTO users
      (
        username,
        password,
        role
      )
      VALUES (?, ?, ?)
      `,
      [
        username,
        hashed,
        role
      ],
      function (err) {

        if (err)
          return res.status(500).json({
            error: err.message
          });

        res.json({
          id: this.lastID,
          username,
          role
        });
      }
    );

  } catch (error) {

    res.status(500).json({
      error: error.message
    });
  }
});

/* ==========================
   ELIMINAR USUARIO
========================== */

app.delete("/api/users/:id", (req, res) => {

  const id = req.params.id;

  db.run(
    "DELETE FROM users WHERE id = ? AND role != 'admin'",
    [id],
    function (err) {

      if (err) {

        return res.status(500).json({
          error: "No se pudo eliminar el usuario."
        });

      }

      if (this.changes === 0) {

        return res.status(400).json({
          error:
            "El usuario no existe o no se puede eliminar."
        });

      }

      res.json({
        message:
          "Usuario eliminado correctamente."
      });

    }
  );

});

app.get("/api/messages", (req, res) => {

  db.all(
    "SELECT * FROM messages",
    [],
    (err, rows) => {

      if (err)
        return res.status(500).json({
          error: err.message
        });

      res.json(rows);
    }
  );
});

app.post("/api/messages", (req, res) => {

  const {
    sender,
    receiver,
    text
  } = req.body;

  if (
    !sender ||
    !receiver ||
    !text ||
    !text.trim()
  ) {

    return res.status(400).json({
      error:
        "Todos los campos son obligatorios"
    });
  }

  db.run(
    `
    INSERT INTO messages
    (
      sender,
      receiver,
      text
    )
    VALUES (?, ?, ?)
    `,
    [
      sender,
      receiver,
      text.trim()
    ],
    function (err) {

      if (err)
        return res.status(500).json({
          error: err.message
        });

      res.json({
        id: this.lastID,
        sender,
        receiver,
        text: text.trim()
      });
    }
  );
});

app.delete("/api/messages", (req, res) => {

  db.run(
    "DELETE FROM messages",
    [],
    function (err) {

      if (err)
        return res.status(500).json({
          error: err.message
        });

      res.json({
        message:
          "Historial borrado"
      });
    }
  );
});

app.get("/api/trades", (req, res) => {

  db.all(
    "SELECT * FROM trades",
    [],
    (err, rows) => {

      if (err)
        return res.status(500).json({
          error: err.message
        });

      res.json(rows);
    }
  );
});

app.post("/api/trades", (req, res) => {

  const {
    username,
    stickerNumber,
    stickerName
  } = req.body;

  db.run(
    `
    INSERT INTO trades
    (
      username,
      stickerNumber,
      stickerName
    )
    VALUES (?, ?, ?)
    `,
    [
      username,
      stickerNumber,
      stickerName
    ],
    function (err) {

      if (err)
        return res.status(500).json({
          error: err.message
        });

      res.json({
        id: this.lastID
      });
    }
  );
});

const PORT = 3000;

app.listen(PORT, () => {

  console.log(
    `Servidor corriendo en http://localhost:${PORT}`
  );
});