/* ==========================
   VARIABLES GLOBALES
========================== */
let currentUser = null;
let players = [];
let users = [];
let matches = [];
let messages = [];

let budget = 5000000;
let myTeam = [];

// Intentar cargar desde localStorage con protección
try {
  const savedUser = localStorage.getItem("currentUser");
  if (savedUser) currentUser = JSON.parse(savedUser);

  const savedBudget = localStorage.getItem("budget");
  if (savedBudget) budget = parseInt(savedBudget);

  const savedTeam = localStorage.getItem("myTeam");
  if (savedTeam) myTeam = JSON.parse(savedTeam);
} catch (e) {
  console.warn("Error leyendo localStorage, se reinician datos", e);
  localStorage.removeItem("currentUser");
  localStorage.removeItem("budget");
  localStorage.removeItem("myTeam");
}

/* ==========================
   LOGIN
========================== */
async function login() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (!res.ok) {
      document.getElementById("loginError").innerText = data.error;
      return;
    }

    currentUser = data.user;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    loadMenu();
    await loadData();
  } catch (err) {
    console.error("Error al hacer login:", err);
    document.getElementById("loginError").innerText = "No se pudo conectar al servidor.";
  }
}

/* ==========================
   CARGAR MENÚ POR ROL
========================== */
function loadMenu() {
  document.getElementById("loginSection").style.display = "none";
  document.getElementById("mainMenu").style.display = "flex";
  const welcomeEl = document.getElementById("menuWelcomeMsg");
  if (currentUser) welcomeEl.innerText = "Bienvenido, " + currentUser.username;

  const btnExternal = document.getElementById("btnExternalPlayers");
  const btnUsers = document.getElementById("btnUserManagement");
  const addMatchForm = document.getElementById("addMatchForm");

  if (currentUser && currentUser.role === "admin") {
    if(btnExternal) btnExternal.style.display = "inline-block";
    if(btnUsers) btnUsers.style.display = "inline-block";
    if(addMatchForm) addMatchForm.style.display = "block";
  } else {
    if(btnExternal) btnExternal.style.display = "none";
    if(btnUsers) btnUsers.style.display = "none";
    if(addMatchForm) addMatchForm.style.display = "none";
  }
}

/* ==========================
   LOGOUT
========================== */
function logout() {
  currentUser = null;

  // Ocultar todas las secciones
  document.querySelectorAll("section").forEach(s => s.style.display = "none");

  // Mostrar login y ocultar menú principal
  document.getElementById("mainMenu").style.display = "none";
  document.getElementById("loginSection").style.display = "flex";

  const welcomeEl = document.getElementById("menuWelcomeMsg");
  if(welcomeEl) welcomeEl.innerText = "";

  localStorage.removeItem("currentUser");
}

/* ==========================
   CAMBIAR SECCIONES
========================== */
function showSection(id) {
  document.querySelectorAll("section").forEach(s => s.style.display = "none");
  const sec = document.getElementById(id);
  if(sec) sec.style.display = "block";

  if(id === "myTeamSection") renderMyTeam();
  if(id === "matchesSection") renderMatches();
  if(id === "externalPlayers") fetchExternalPlayers();
  if(id === "chatSection") renderChat();
}

/* ==========================
   CARGAR DATOS
========================== */
async function loadData() {
  await fetchExternalPlayers(); // reemplaza fetchPlayers
  await fetchUsers();
  await fetchMatches();
  await fetchMessages();
  updateBudget();
  renderMyTeam();
}

/* ==========================
   MI EQUIPO
========================== */
function updateBudget() {
  const el = document.getElementById("budgetDisplay");
  if(el) el.innerText = budget;
  localStorage.setItem("budget", budget);
}

function renderMyTeam() {
  const list = document.getElementById("myTeamList");
  if(!list) return;
  list.innerHTML = "";

  if(!myTeam.length) {
    list.innerHTML = "<li>No tenés jugadores en tu equipo.</li>";
    return;
  }

  myTeam.forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${p.name}</strong> - ${p.position}<br>
                    <strong>Valor:</strong> $${p.price}`;
    if(currentUser && currentUser.role === "admin") {
      const btnSell = document.createElement("button");
      btnSell.innerText = "Vender";
      btnSell.onclick = () => sellPlayer(p.name);
      li.appendChild(document.createElement("br"));
      li.appendChild(btnSell);
    }
    list.appendChild(li);
  });
}

function addToTeam(name, position, price, btn) {
  if(myTeam.some(p => p.name === name)) { alert("Este jugador ya está en tu equipo."); return; }
  if(budget < price) { alert("No tenés suficiente presupuesto."); return; }

  budget -= price;
  myTeam.push({ name, position, price });

  if(btn && btn.parentNode) btn.parentNode.remove();

  localStorage.setItem("myTeam", JSON.stringify(myTeam));
  localStorage.setItem("budget", budget);

  updateBudget();
  renderMyTeam();
}

function sellPlayer(name) {
  const player = myTeam.find(p => p.name === name);
  if(!player) return;

  budget += Math.floor(player.price * 0.6);
  myTeam = myTeam.filter(p => p.name !== name);

  localStorage.setItem("myTeam", JSON.stringify(myTeam));
  localStorage.setItem("budget", budget);

  updateBudget();
  renderMyTeam();
}

function resetMyTeam() {
  if(!confirm("¿Seguro que querés reiniciar tu equipo y presupuesto?")) return;

  budget = 5000000;
  myTeam = [];
  localStorage.setItem("budget", budget);
  localStorage.setItem("myTeam", JSON.stringify(myTeam));

  updateBudget();
  renderMyTeam();
  alert("Tu equipo ha sido reiniciado al presupuesto inicial.");
}

/* ==========================
   PLAYERS EXTERNOS
========================== */
async function fetchExternalPlayers() {
  try {
    const res = await fetch("http://localhost:3000/api/full-external-players");
    const listPlayers = await res.json();

    const list = document.getElementById("externalPlayersList");
    if(!list) return;
    list.innerHTML = "";

    listPlayers.forEach(p => {
      const li = document.createElement("li");

      // Destacar arqueros
      if(p.position.toLowerCase() === "arquero") {
        li.style.padding = "5px";
        li.style.marginBottom = "5px";
      }

      li.innerHTML = `
        <strong>${p.name}</strong> (${p.club})<br>
        Posición: ${p.position}<br>
        Edad: ${p.age} | Goles: ${p.goals} | Altura: ${p.height} cm<br>
        <strong>Precio: $${p.price}</strong><br>
        <button onclick="addToTeam('${p.name}','${p.position}',${p.price}, this)">Agregar a mi equipo</button>
      `;
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Error cargando jugadores externos:", err);
  }
}

function openExternalPlayers() {
  showSection("externalPlayers");
}

/* ==========================
   PARTIDOS
========================== */
async function fetchMatches() {
  const res = await fetch("http://localhost:3000/api/matches");
  matches = await res.json();
  renderMatches();
}

function renderMatches() {
  const list = document.getElementById("matchList");
  if(!list) return;
  list.innerHTML = "";

  matches.forEach(m => {
    const li = document.createElement("li");
    li.innerText = `${m.date} vs ${m.opponent}`;

    if(currentUser && currentUser.role === "admin") {
      const btnDel = document.createElement("button");
      btnDel.innerText = "Eliminar";
      btnDel.onclick = () => deleteMatch(m.id);
      li.appendChild(document.createElement("br"));
      li.appendChild(btnDel);
    }

    list.appendChild(li);
  });
}

async function addMatch() {
  const date = document.getElementById("matchDate").value;
  const opponent = document.getElementById("matchOpponent").value;

  if(!date || !opponent) return alert("Completar ambos campos");

  await fetch("http://localhost:3000/api/matches", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, opponent })
  });

  await fetchMatches();
}

async function deleteMatch(id) {
  await fetch(`http://localhost:3000/api/matches/${id}`, { method: "DELETE" });
  await fetchMatches();
}

/* ==========================
   USUARIOS
========================== */
async function fetchUsers() {
  const res = await fetch("http://localhost:3000/api/users");
  users = await res.json();
  renderUsers();
}

function renderUsers() {
  const list = document.getElementById("userList");
  if(!list) return;
  list.innerHTML = "";
  users.forEach(u => {
    list.innerHTML += `<li>${u.username} (${u.role})</li>`;
  });
}

async function addUser() {
  const username = document.getElementById("newUsername").value;
  const password = document.getElementById("newPassword").value;
  const role = document.getElementById("newUserRole").value;

  await fetch("http://localhost:3000/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, role })
  });

  await fetchUsers();
}

/* ==========================
   CHAT
========================== */
async function fetchMessages() {
  const res = await fetch("http://localhost:3000/api/messages");
  messages = await res.json();
  renderChat();
}

function renderChat() {
  const list = document.getElementById("chatList");
  if(!list) return;
  list.innerHTML = "";

  messages.forEach(m => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${m.sender} → ${m.receiver}:</strong> ${m.text}`;
    list.appendChild(li);
  });

  const select = document.getElementById("selectChatUser");
  if(!select) return;
  select.innerHTML = "";
  users.forEach(u => {
    if(currentUser && u.username !== currentUser.username) {
      const opt = document.createElement("option");
      opt.value = u.username;
      opt.innerText = u.username;
      select.appendChild(opt);
    }
  });
}

async function sendMessage(event) {
  if(event) event.preventDefault(); // prevenir submit por defecto

  const receiver = document.getElementById("selectChatUser").value;
  const text = document.getElementById("chatMessage").value.trim();
  if(!receiver || !text) return;

  await fetch("http://localhost:3000/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sender: currentUser.username, receiver, text })
  });

  document.getElementById("chatMessage").value = "";
  await fetchMessages();
}

/* ==========================
   INICIALIZACIÓN
========================== */
document.addEventListener("DOMContentLoaded", async () => {
  // Intentar cargar currentUser de localStorage si no se hizo al inicio
  try {
    if (!currentUser) {
      const savedUser = localStorage.getItem("currentUser");
      if (savedUser) currentUser = JSON.parse(savedUser);
    }
  } catch (e) {
    console.warn("Error leyendo usuario del localStorage", e);
    currentUser = null;
    localStorage.removeItem("currentUser");
  }

  // Si hay usuario logueado, cargar menú y datos
  if (currentUser) {
    loadMenu();
    await loadData();
  } else {
    // Mostrar login si no hay sesión
    showSection("loginSection");
  }

  // Actualizar presupuesto y renderizar equipo aunque haya sesión o no
  updateBudget();
  renderMyTeam();
});

