import AppModel from "../models/appModel.js";
import AppView from "../views/appView.js";

class AppController {

  constructor() {

    this.model = new AppModel();
    this.view = new AppView();

    // Figurita seleccionada para intercambio
    this.selectedStickerNumber = null;

    this.init();
  }


  // =====================================================
  // INICIALIZACIÓN
  // =====================================================

  async init() {

    if (this.model.currentUser) {

      await this.refreshData();

      this.showMenuForUser();

    } else {

      this.view.showLogin();
    }


    // =====================================================
    // LOGIN / REGISTRO
    // =====================================================

    document.getElementById("registerBtn")
      ?.addEventListener(
        "click",
        () => this.handleRegister()
      );

    document.getElementById("loginBtn")
      ?.addEventListener(
        "click",
        () => this.handleLogin()
      );


    // =====================================================
    // MENÚ PRINCIPAL
    // =====================================================

    document.getElementById("btnCollection")
      ?.addEventListener(
        "click",
        () => this.showCollection()
      );

    document.getElementById("btnAlbum")
      ?.addEventListener(
        "click",
        () => this.showAlbum()
      );

    document.getElementById("btnRepeated")
      ?.addEventListener(
        "click",
        () => this.showRepeated()
      );

    document.getElementById("btnMarket")
      ?.addEventListener(
        "click",
        () => this.showMarket()
      );

    document.getElementById("btnOpenPack")
      ?.addEventListener(
        "click",
        () => this.handleOpenPack()
      );

    document.getElementById("btnTrades")
      ?.addEventListener(
        "click",
        () => this.showTrades()
      );


    // =====================================================
    // COMPRAR FIGURITA
    // =====================================================

    document.addEventListener("click", (e) => {

      if (!e.target.classList.contains("buyBtn")) {
        return;
      }

      const number =
        Number(e.target.dataset.number);

      const sticker =
        this.model.stickers.find(
          s => s.number === number
        );

      if (!sticker) {
        return;
      }

      const price =
        this.model.getStickerPrice(sticker);

      if (this.model.coins < price) {

        alert("No tenés monedas suficientes");

        return;
      }

      this.model.coins -= price;

      this.model.myCollection.push(sticker);

      this.model.saveUserData();

      this.view.updateCoins(
        this.model.coins
      );

      alert(
        `Compraste ${sticker.name} por $${price}`
      );

      this.showMarket();
    });


    // =====================================================
    // ELIMINAR USUARIO
    // =====================================================

    document.addEventListener(
      "click",
      (event) => {

        if (
          !event.target.classList.contains(
            "deleteUserBtn"
          )
        ) {
          return;
        }

        const id =
          event.target.dataset.id;

        const username =
          event.target.dataset.username;

        this.deleteUser(
          id,
          username
        );
      }
    );


    // =====================================================
    // VENDER FIGURITA
    // =====================================================

    document.addEventListener("click", (e) => {

      if (!e.target.classList.contains("sellBtn")) {
        return;
      }

      const number =
        Number(e.target.dataset.number);

      const price =
        this.model.sellSticker(number);

      if (!price) {
        return;
      }

      this.view.updateCoins(
        this.model.coins
      );

      alert(
        `Figurita vendida por $${price}
Monedas: $${this.model.coins}`
      );

      this.showCollection();
    });


    // =====================================================
    // ÁLBUM POR EQUIPO
    // =====================================================

    document.addEventListener("click", (e) => {

      if (
        !e.target.classList.contains(
          "albumTeamBtn"
        )
      ) {
        return;
      }

      const team =
        e.target.dataset.team;

      const stickers =
        this.model.getStickersByTeam(team);

      const teamTitle =
        document.getElementById("teamTitle");

      if (teamTitle) {
        teamTitle.innerText = team;
      }

      this.view.renderAlbumByTeam(
        stickers,
        this.model.myCollection
      );

      this.view.showSection(
        "teamAlbumSection"
      );

      document.getElementById("btnBackTeams")
        ?.addEventListener(
          "click",
          () => {
            this.view.showSection(
              "albumSection"
            );
          }
        );
    });


    // =====================================================
    // SELECCIONAR USUARIO PARA INTERCAMBIO
    // =====================================================

    document.addEventListener("click", (e) => {

      if (
        !e.target.classList.contains(
          "selectUserTradeBtn"
        )
      ) {
        return;
      }

      const username =
        e.target.dataset.user;

      this.showUserCollectionForTrade(
        username
      );
    });


    // =====================================================
    // FILTRO POR RAREZA
    // =====================================================

    document.getElementById("btnApplyRarity")
      ?.addEventListener(
        "click",
        () => this.handleRarityFilter()
      );


    // =====================================================
    // CHAT
    // =====================================================

    document.getElementById("btnChat")
      ?.addEventListener(
        "click",
        () => this.initChat()
      );

    document.getElementById("sendMessageBtn")
      ?.addEventListener(
        "click",
        () => this.handleSendMessage()
      );

    document.getElementById("clearMessagesBtn")
      ?.addEventListener(
        "click",
        () => this.handleClearMessages()
      );

    document.getElementById("selectChatUser")
      ?.addEventListener(
        "change",
        () => this.renderCurrentChat()
      );


    // =====================================================
    // ADMINISTRACIÓN
    // =====================================================

    document.getElementById("btnUserManagement")
      ?.addEventListener(
        "click",
        () => this.handleUsers()
      );


    // =====================================================
    // NAVEGACIÓN LOGIN / REGISTRO
    // =====================================================

    document.getElementById("goToRegisterBtn")
      ?.addEventListener(
        "click",
        () => {

          this.view.showSection(
            "registerSection"
          );
        }
      );

    document.getElementById("goToLoginBtn")
      ?.addEventListener(
        "click",
        () => {

          this.view.showLogin();
        }
      );


    // =====================================================
    // FILTRO RAREZA
    // =====================================================

    document.getElementById("btnFilterRarity")
      ?.addEventListener(
        "click",
        () => {

          this.view.showSection(
            "raritySection"
          );
        }
      );


    // =====================================================
    // INICIAR INTERCAMBIO
    // =====================================================

    document.addEventListener(
      "click",
      async (e) => {

        if (
          !e.target.classList.contains(
            "tradeBtn"
          )
        ) {
          return;
        }

        await this.model.fetchUsers();

        const number =
          Number(e.target.dataset.number);

        this.showTradeUsers(number);
      }
    );


    // =====================================================
    // ACEPTAR INTERCAMBIO
    // =====================================================

    document.addEventListener(
      "click",
      (e) => {

        if (
          !e.target.classList.contains(
            "acceptTradeBtn"
          )
        ) {
          return;
        }

        const id =
          Number(e.target.dataset.id);

        const ok =
          this.model.acceptTradeRequest(id);

        if (!ok) {

          alert(
            "No se pudo realizar el intercambio"
          );

          return;
        }

        alert(
          "Intercambio aceptado"
        );

        this.showTrades();
      }
    );


    // =====================================================
    // RECHAZAR INTERCAMBIO
    // =====================================================

    document.addEventListener(
      "click",
      (e) => {

        if (
          !e.target.classList.contains(
            "rejectTradeBtn"
          )
        ) {
          return;
        }

        const id =
          Number(e.target.dataset.id);

        this.model.rejectTradeRequest(id);

        alert(
          "Solicitud rechazada"
        );

        this.showTrades();
      }
    );


    // =====================================================
    // ENVIAR SOLICITUD DE INTERCAMBIO
    // =====================================================

    document.addEventListener(
      "click",
      (e) => {

        if (
          !e.target.classList.contains(
            "requestTradeBtn"
          )
        ) {
          return;
        }

        const username =
          e.target.dataset.user;

        const stickerNumber =
          Number(e.target.dataset.number);

        const requestedSticker =
          this.model
            .getUserCollection(username)
            .find(
              s =>
                s.number === stickerNumber
            );

        const offeredSticker =
          this.model.myCollection.find(
            s =>
              s.number ===
              this.selectedStickerNumber
          );

        console.log(
          "selectedStickerNumber:",
          this.selectedStickerNumber
        );

        console.log(
          "offeredSticker:",
          offeredSticker
        );

        console.log(
          "requestedSticker:",
          requestedSticker
        );

        if (!offeredSticker) {

          alert(
            "No seleccionaste una figurita para ofrecer."
          );

          return;
        }

        if (!requestedSticker) {

          alert(
            "No se encontró la figurita solicitada."
          );

          return;
        }

        this.model.createTradeRequest(
          username,
          offeredSticker,
          requestedSticker
        );

        alert(
          "Solicitud de intercambio enviada."
        );
      }
    );


    // =====================================================
    // LOGOUT
    // =====================================================

    document.getElementById("btnLogout")
      ?.addEventListener(
        "click",
        () => this.logout()
      );


    // =====================================================
    // BOTONES VOLVER
    // =====================================================

    document.querySelectorAll(".backBtn")
      .forEach(btn => {

        btn.addEventListener(
          "click",
          () => this.showMenuForUser()
        );

      });
  }


  // =====================================================
  // REGISTRO
  // =====================================================

  async handleRegister() {

    const username =
      document.getElementById(
        "regUsername"
      ).value.trim();

    const password =
      document.getElementById(
        "regPassword"
      ).value.trim();

    if (!username || !password) {

      alert(
        "Completá usuario y contraseña."
      );

      return;
    }

    try {

      await this.model.register(
        username,
        password
      );

      alert(
        "Usuario registrado correctamente"
      );

      this.view.showLogin();

    } catch (err) {

      alert(
        err.message
      );
    }
  }


  // =====================================================
  // MENÚ PRINCIPAL
  // =====================================================

  showMenuForUser() {

    if (!this.model.currentUser) {
      return;
    }

    this.view.showMenu(
      this.model.currentUser.username,
      this.model.currentUser.role
    );

    this.view.updateCoins(
      this.model.coins
    );

    const stats =
      this.model.getAlbumStats();

    const percentage =
      stats.total > 0
        ? Math.round(
            (stats.owned / stats.total) * 100
          )
        : 0;


    const welcome =
      document.getElementById(
        "welcomeDashboard"
      );

    if (welcome) {

      welcome.innerText =
        `Bienvenido ${this.model.currentUser.username}`;
    }


    const percentageElement =
      document.getElementById(
        "albumPercentage"
      );

    if (percentageElement) {

      percentageElement.innerText =
        `${percentage}%`;
    }


    const progress =
      document.getElementById(
        "albumProgress"
      );

    if (progress) {

      progress.style.width =
        `${percentage}%`;
    }
  }


  // =====================================================
  // COLECCIÓN DE OTRO USUARIO
  // =====================================================

  showUserCollectionForTrade(username) {

    const collection =
      this.model.getUserCollection(username);

    const selectedUser =
      document.getElementById(
        "selectedUser"
      );

    if (selectedUser) {
      selectedUser.innerText = username;
    }

    const list =
      document.getElementById(
        "otherCollectionList"
      );

    if (!list) {
      return;
    }

    list.innerHTML = "";


    if (!collection.length) {

      list.innerHTML =
        "<li>Este usuario no tiene figuritas.</li>";

      this.view.showSection(
        "tradeSection"
      );

      return;
    }


    collection.forEach(sticker => {

      const count =
        collection.filter(
          s =>
            s.number === sticker.number
        ).length;

      const isRepeated =
        count > 1;

      const li =
        document.createElement("li");

      li.innerHTML = `
        #${sticker.number}
        ${sticker.name}
        (${sticker.rarity})

        ${isRepeated ? "🔁 REPETIDA" : ""}

        <button
          class="requestTradeBtn"
          data-user="${username}"
          data-number="${sticker.number}">
          Pedir esta figurita
        </button>
      `;

      list.appendChild(li);
    });


    this.view.showSection(
      "tradeSection"
    );
  }


  // =====================================================
  // LOGIN
  // =====================================================

  async handleLogin() {

    const username =
      document.getElementById(
        "loginUsername"
      ).value.trim();

    const password =
      document.getElementById(
        "loginPassword"
      ).value.trim();


    if (!username || !password) {

      alert(
        "Completá usuario y contraseña."
      );

      return;
    }


    try {

      await this.model.login(
        username,
        password
      );

      await this.refreshData();

      this.showMenuForUser();

    } catch (err) {

      alert(
        err.message
      );
    }
  }


  // =====================================================
  // ACTUALIZAR DATOS
  // =====================================================

  async refreshData() {

    await this.model.fetchUsers();

    await this.model.fetchMessages();
  }


  // =====================================================
  // COLECCIÓN
  // =====================================================

  showCollection() {

    this.view.renderCollection(
      this.model.getCollection(),
      "collectionList"
    );

    this.view.showSection(
      "collectionSection"
    );
  }


  // =====================================================
  // ÁLBUM
  // =====================================================

  showAlbum() {

    const stats =
      this.model.getAlbumStats();

    const albumCount =
      document.getElementById(
        "albumCount"
      );

    if (albumCount) {
      albumCount.innerText = stats.owned;
    }


    const missingCount =
      document.getElementById(
        "missingCount"
      );

    if (missingCount) {
      missingCount.innerText = stats.missing;
    }


    this.view.renderAlbumTeams(
      this.model.getTeams()
    );

    this.view.showSection(
      "albumSection"
    );
  }


  // =====================================================
  // REPETIDAS
  // =====================================================

  showRepeated() {

    this.view.renderCollection(
      this.model.getRepeatedStickers(),
      "repeatedList"
    );

    this.view.showSection(
      "repeatedSection"
    );
  }


  // =====================================================
  // MERCADO
  // =====================================================

  showMarket() {

    this.view.renderCollection(
      this.model.stickers,
      "marketList"
    );

    this.view.showSection(
      "marketSection"
    );
  }


  // =====================================================
  // INTERCAMBIOS
  // =====================================================

  showTrades() {

    const requests =
      this.model.getReceivedTradeRequests();

    const list =
      document.getElementById(
        "tradeRequestsList"
      );

    if (!list) {
      return;
    }

    list.innerHTML = "";


    if (!requests.length) {

      list.innerHTML =
        "<li>No tenés solicitudes pendientes.</li>";

      this.view.showSection(
        "tradesSection"
      );

      return;
    }


    requests.forEach(request => {

      const li =
        document.createElement("li");

      li.className =
        "trade-card";


      li.innerHTML = `
        <div class="trade-header">

          🤝 <strong>${request.from}</strong>
          quiere intercambiar

        </div>


        <div class="trade-body">

          <div class="trade-sticker">

            <h4>Te ofrece</h4>

            <p>
              #${request.offeredSticker.number}
            </p>

            <p>
              ${request.offeredSticker.name}
            </p>

          </div>


          <div class="trade-arrow">
            ⇄
          </div>


          <div class="trade-sticker">

            <h4>Por tu</h4>

            <p>
              #${request.requestedSticker.number}
            </p>

            <p>
              ${request.requestedSticker.name}
            </p>

          </div>

        </div>


        <div class="trade-buttons">

          <button
            class="acceptTradeBtn"
            data-id="${request.id}">
            ✔ Aceptar
          </button>


          <button
            class="rejectTradeBtn"
            data-id="${request.id}">
            ✖ Rechazar
          </button>

        </div>
      `;

      list.appendChild(li);
    });


    this.view.showSection(
      "tradesSection"
    );
  }


  // =====================================================
  // ABRIR SOBRE
  // =====================================================

  handleOpenPack() {

    const stickers =
      this.model.openPack();


    if (!stickers || !stickers.length) {

      this.view.updateCoins(
        this.model.coins
      );

      return;
    }


    this.view.updateCoins(
      this.model.coins
    );

    this.showMenuForUser();


    alert(
      "Obtuviste:\n\n" +
      stickers
        .map(
          s =>
            `#${s.number} ${s.name}`
        )
        .join("\n")
    );


    this.showCollection();
  }


  // =====================================================
  // FILTRO POR RAREZA
  // =====================================================

  handleRarityFilter() {

    const select =
      document.getElementById(
        "raritySelect"
      );

    if (!select) {
      return;
    }

    const rarity =
      select.value;

    const result =
      this.model.getStickersByRarity(
        rarity
      );

    this.view.renderCollection(
      result,
      "rarityList"
    );
  }


  // =====================================================
  // INICIALIZAR CHAT
  // =====================================================

  async initChat() {

    try {

      await this.model.fetchUsers();

      await this.model.fetchMessages();


      this.view.renderChatUsers(
        this.model.users,
        this.model.currentUser
      );


      this.view.showSection(
        "chatSection"
      );


      const select =
        document.getElementById(
          "selectChatUser"
        );


      if (
        select &&
        select.value
      ) {

        this.view.renderMessages(
          this.model.messages,
          this.model.currentUser.username,
          select.value
        );
      }

    } catch (error) {

      console.error(
        "Error inicializando chat:",
        error
      );

      alert(
        "No se pudo cargar el chat."
      );
    }
  }


  // =====================================================
  // ENVIAR MENSAJE
  // =====================================================

  async handleSendMessage() {

    const select =
      document.getElementById(
        "selectChatUser"
      );

    const input =
      document.getElementById(
        "chatMessage"
      );


    if (!select || !input) {

      console.error(
        "No se encontró el selector o campo de mensaje."
      );

      return;
    }


    const receiver =
      select.value;

    const text =
      input.value.trim();


    if (!receiver) {

      alert(
        "Seleccioná un usuario."
      );

      return;
    }


    if (!text) {

      alert(
        "Escribí un mensaje."
      );

      return;
    }


    if (!this.model.currentUser) {

      alert(
        "No hay un usuario logueado."
      );

      return;
    }


    const sender =
      this.model.currentUser.username;


    try {

      await this.model.sendMessage(
        sender,
        receiver,
        text
      );


      input.value = "";


      // Volvemos a cargar los mensajes
      // para mostrar el mensaje recién enviado.

      await this.model.fetchMessages();


      this.view.renderMessages(
        this.model.messages,
        sender,
        receiver
      );

    } catch (error) {

      console.error(
        "Error enviando mensaje:",
        error
      );

      alert(
        error.message ||
        "No se pudo enviar el mensaje."
      );
    }
  }


  // =====================================================
  // CAMBIAR CHAT
  // =====================================================

  renderCurrentChat() {

    const select =
      document.getElementById(
        "selectChatUser"
      );


    if (!select) {
      return;
    }


    const selectedUser =
      select.value;


    if (!selectedUser) {
      return;
    }


    if (!this.model.currentUser) {
      return;
    }


    this.view.renderMessages(
      this.model.messages,
      this.model.currentUser.username,
      selectedUser
    );
  }


  // =====================================================
  // BORRAR MENSAJES
  // =====================================================

  async handleClearMessages() {

    const confirmar =
      confirm(
        "¿Querés borrar todo el historial de mensajes?"
      );


    if (!confirmar) {
      return;
    }


    try {

      await this.model.clearMessages();


      const list =
        document.getElementById(
          "chatMessagesList"
        );


      if (list) {

        list.innerHTML =
          "<li>No hay mensajes</li>";
      }


      // Actualizar memoria local
      this.model.messages = [];


      alert(
        "Historial borrado correctamente."
      );

    } catch (error) {

      console.error(
        "Error borrando mensajes:",
        error
      );

      alert(
        error.message ||
        "No se pudo borrar el historial."
      );
    }
  }


  // =====================================================
  // ADMINISTRAR USUARIOS
  // =====================================================

  async handleUsers() {

    if (
      !this.model.currentUser ||
      this.model.currentUser.role !== "admin"
    ) {

      alert(
        "Solo admin"
      );

      return;
    }


    try {

      await this.model.fetchUsers();


      this.view.renderUsers(
        this.model.users
      );


      this.view.showSection(
        "userManagementSection"
      );

    } catch (error) {

      console.error(
        "Error cargando usuarios:",
        error
      );

      alert(
        "No se pudieron cargar los usuarios."
      );
    }
  }


  // =====================================================
  // USUARIOS PARA INTERCAMBIO
  // =====================================================

  showTradeUsers(stickerNumber) {

    this.selectedStickerNumber =
      stickerNumber;


    const users =
      this.model.users.filter(
        u =>
          u.username !==
          this.model.currentUser.username
      );


    const list =
      document.getElementById(
        "tradeUsersList"
      );


    if (!list) {
      return;
    }


    list.innerHTML = "";


    users.forEach(user => {

      const li =
        document.createElement("li");


      li.innerHTML = `
        ${user.username}

        <button
          class="selectUserTradeBtn"
          data-user="${user.username}">
          Ver figuritas
        </button>
      `;


      list.appendChild(li);
    });


    this.view.showSection(
      "tradeUsersSection"
    );
  }


  // =====================================================
  // ELIMINAR USUARIO
  // =====================================================

  async deleteUser(id, username) {

    const confirmDelete =
      confirm(
        `¿Estás seguro de que querés eliminar al usuario "${username}"?`
      );


    if (!confirmDelete) {
      return;
    }


    try {

      const res =
        await fetch(
          `http://localhost:3000/api/users/${id}`,
          {
            method: "DELETE"
          }
        );


      const data =
        await res.json();


      if (!res.ok) {

        alert(
          data.error ||
          "No se pudo eliminar el usuario."
        );

        return;
      }


      alert(
        "Usuario eliminado correctamente."
      );


      await this.model.fetchUsers();


      this.view.renderUsers(
        this.model.users
      );

    } catch (error) {

      console.error(
        "Error eliminando usuario:",
        error
      );

      alert(
        "No se pudo conectar con el servidor."
      );
    }
  }


  // =====================================================
  // LOGOUT
  // =====================================================

  logout() {

    this.model.logout();

    this.view.showLogin();
  }
}


// =====================================================
// EXPORTAR CONTROLADOR
// =====================================================

export default AppController;


// =====================================================
// INICIAR APLICACIÓN
// =====================================================

new AppController();

