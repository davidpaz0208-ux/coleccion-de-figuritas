const db = require("./db");
const bcrypt = require("bcryptjs");

async function seed() {

  const password = await bcrypt.hash("123", 10);

  console.log("");
  console.log("================================");
  console.log(" LIMPIANDO USUARIOS ANTIGUOS");
  console.log("================================");

  // Eliminar usuarios antiguos
  db.run(
    `
    DELETE FROM users
    WHERE username IN ('presidente', 'tecnico')
    `,
    function (err) {

      if (err) {
        console.error(
          "Error eliminando usuarios antiguos:",
          err.message
        );
        return;
      }

      console.log(
        `Usuarios antiguos eliminados: ${this.changes}`
      );

      // Crear admin si no existe
      db.run(
        `
        INSERT OR IGNORE INTO users
        (username, password, role)
        VALUES (?, ?, ?)
        `,
        [
          "admin",
          password,
          "admin"
        ],
        function (err) {

          if (err) {
            console.error(
              "Error creando admin:",
              err.message
            );
            return;
          }

          console.log("Admin listo.");

          // Crear user si no existe
          db.run(
            `
            INSERT OR IGNORE INTO users
            (username, password, role)
            VALUES (?, ?, ?)
            `,
            [
              "user",
              password,
              "user"
            ],
            function (err) {

              if (err) {
                console.error(
                  "Error creando user:",
                  err.message
                );
                return;
              }

              console.log("User listo.");

              console.log("");
              console.log("================================");
              console.log(" USUARIOS DEL SISTEMA");
              console.log("================================");
              console.log(" Admin -> contraseña: 123");
              console.log(" User  -> contraseña: 123");
              console.log("================================");
              console.log("");
            }
          );
        }
      );
    }
  );
}

seed();