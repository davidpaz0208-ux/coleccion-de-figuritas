export default class AppModel {

  constructor() {

    this.currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    this.coins = 5000;
    this.myCollection = [];

    this.users = [];
    this.messages = [];

    this.stickers = [


      { number: 1, name: "Dibu Martínez", team: "Argentina", rarity: "Rare", image: "img/Argentina/dibu.jpg" },
      { number: 2, name: "Molina", team: "Argentina", rarity: "Common", image: "img/Argentina/Molina.jpg" },
      { number: 3, name: "Otamendi", team: "Argentina", rarity: "Common", image: "img/Argentina/otamendi.jpg" },
      { number: 4, name: "Romero", team: "Argentina", rarity: "Rare", image: "img/Argentina/Romero.jpg" },
      { number: 5, name: "Tagliafico", team: "Argentina", rarity: "Common", image: "img/Argentina/Tagliafico.jpg" },
      { number: 6, name: "De Paul", team: "Argentina", rarity: "Common", image: "img/Argentina/De Paul.jpg" },
      { number: 7, name: "Mac Allister", team: "Argentina", rarity: "Rare", image: "img/Argentina/Mac Allister.jpg" },
      { number: 8, name: "Paredes", team: "Argentina", rarity: "Common", image: "img/Argentina/Paredes.jpg" },
      { number: 9, name: "Enzo Fernández", team: "Argentina", rarity: "Rare", image: "img/Argentina/Enzo_Fernández.jpg" },
      { number: 10, name: "Julián Álvarez", team: "Argentina", rarity: "Rare", image: "img/Argentina/Julian.jpg" },
      { number: 11, name: "Lautaro Martínez", team: "Argentina", rarity: "Rare", image: "img/Argentina/Lautaro.jpg" },
      { number: 12, name: "Nico Gonzalez", team: "Argentina", rarity: "Legend", image: "img/Argentina/Nico Gonzalez.jpg" },
      { number: 13, name: "Lopez", team: "Argentina", rarity: "Rare", image: "img/Argentina/Lopez.jpg" },
      { number: 14, name: "Almada", team: "Argentina", rarity: "Common", image: "img/Argentina/Almada.jpg" },
      { number: 15, name: "Lionel Messi", team: "Argentina", rarity: "Legend", image: "img/Argentina/Messi.jpg" },


      { number: 16, name: "Alisson", team: "Brasil", rarity: "Rare", image: "img/Brasil/Alisson.jpg" },
      { number: 17, name: "Danilo", team: "Brasil", rarity: "Common", image: "img/Brasil/Danilo.jpg" },
      { number: 18, name: "Marquinhos", team: "Brasil", rarity: "Rare", image: "img/Brasil/Marquinhos.jpg" },
      { number: 19, name: "Militao", team: "Brasil", rarity: "Rare", image: "img/Brasil/Militao.jpeg" },
      { number: 20, name: "Alex Sandro", team: "Brasil", rarity: "Common", image: "img/Brasil/Alex Sandro.png" },
      { number: 21, name: "Casemiro", team: "Brasil", rarity: "Rare", image: "img/Brasil/Casemiro.jpg" },
      { number: 22, name: "Paquetá", team: "Brasil", rarity: "Common", image: "img/Brasil/Paquetá.jpg" },
      { number: 23, name: "Bruno Guimarães", team: "Brasil", rarity: "Rare", image: "img/Brasil/Bruno Guimarães.jpg" },
      { number: 24, name: "Raphinha", team: "Brasil", rarity: "Rare", image: "img/Brasil/Raphinha.avif" },
      { number: 25, name: "Rodrygo", team: "Brasil", rarity: "Rare", image: "img/Brasil/Rodrygo.jpg" },
      { number: 26, name: "Gabriel Jesus", team: "Brasil", rarity: "Common", image: "img/Brasil/Gabriel Jesus.jpg" },
      { number: 27, name: "Richarlison", team: "Brasil", rarity: "Rare", image: "img/Brasil/Richarlison.png" },
      { number: 28, name: "Vinicius Jr", team: "Brasil", rarity: "Legend", image: "img/Brasil/Vinicius Jr.png" },
      { number: 29, name: "Endrick", team: "Brasil", rarity: "Rare", image: "img/Brasil/Endrick.png" },
      { number: 30, name: "Neymar", team: "Brasil", rarity: "Legend", image: "img/Brasil/Neymar.jpg" },


      { number: 31, name: "Maignan", team: "Francia", rarity: "Rare", image: "img/Francia/Maignan.jpg" },
      { number: 32, name: "Koundé", team: "Francia", rarity: "Common", image: "img/Francia/Koundé.jpg" },
      { number: 33, name: "Saliba", team: "Francia", rarity: "Rare", image: "img/Francia/Saliba.jpg" },
      { number: 34, name: "Upamecano", team: "Francia", rarity: "Common", image: "img/Francia/Upamecano.png" },
      { number: 35, name: "Theo Hernández", team: "Francia", rarity: "Rare", image: "img/Francia/Theo Hernández.jpg" },
      { number: 36, name: "Tchouaméni", team: "Francia", rarity: "Rare", image: "img/Francia/Tchouaméni.jpg" },
      { number: 37, name: "Kanté", team: "Francia", rarity: "Rare", image: "img/Francia/Kanté.jpg" },
      { number: 38, name: "Mbappe", team: "Francia", rarity: "Common", image: "img/Francia/Mbappe.jpg" },
      { number: 39, name: "Dembélé", team: "Francia", rarity: "Rare", image: "img/Francia/Dembélé.jpg" },
      { number: 40, name: "Griezmann", team: "Francia", rarity: "Legend", image: "img/Francia/Griezmann.jpg" },


      { number: 41, name: "Diogo Costa", team: "Portugal", rarity: "Rare", image: "img/Portugal/Diogo Costa.jpg" },
      { number: 42, name: "Cancelo", team: "Portugal", rarity: "Rare", image: "img/Portugal/Cancelo.jpg" },
      { number: 43, name: "Pepe", team: "Portugal", rarity: "Common", image: "img/Portugal/Pepe.jpg" },
      { number: 44, name: "Ruben Dias", team: "Portugal", rarity: "Rare", image: "img/Portugal/Ruben Dias.jpg" },
      { number: 45, name: "Nuno Mendes", team: "Portugal", rarity: "Rare", image: "img/Portugal/Nuno Mendes.png" },
      { number: 46, name: "Palhinha", team: "Portugal", rarity: "Common", image: "img/Portugal/Palhinha.jpg" },
      { number: 47, name: "Vitinha", team: "Portugal", rarity: "Rare", image: "img/Portugal/Vitinha.jpg" },
      { number: 48, name: "Bernardo Silva", team: "Portugal", rarity: "Legend", image: "img/Portugal/Bernardo Silva.jpg" },
      { number: 49, name: "Bruno Fernandes", team: "Portugal", rarity: "Legend", image: "img/Portugal/Bruno Fernandes.avif" },
      { number: 50, name: "João Félix", team: "Portugal", rarity: "Rare", image: "img/Portugal/João Félix.jpg" },
      { number: 51, name: "Rafael Leão", team: "Portugal", rarity: "Legend", image: "img/Portugal/Rafael Leão.png" },
      { number: 52, name: "Gonçalo Ramos", team: "Portugal", rarity: "Rare", image: "img/Portugal/Gonçalo Ramos.jpg" },
      { number: 53, name: "Cristiano Ronaldo", team: "Portugal", rarity: "Legend", image: "img/Portugal/Cristiano Ronaldo.jpg" },
      { number: 54, name: "Pedro Neto", team: "Portugal", rarity: "Rare", image: "img/Portugal/Pedro Neto.jpg" },
      { number: 55, name: "Dalot", team: "Portugal", rarity: "Common", image: "img/Portugal/Dalot.jpg" },


      { number: 56, name: "Rochet", team: "Uruguay", rarity: "Rare", image: "img/Uruguay/Rochet.jpg" },
      { number: 57, name: "Araujo", team: "Uruguay", rarity: "Legend", image: "img/Uruguay/Araujo.jpg" },
      { number: 58, name: "Giménez", team: "Uruguay", rarity: "Rare", image: "img/Uruguay/Giménez.jpg" },
      { number: 59, name: "Viña", team: "Uruguay", rarity: "Common", image: "img/Uruguay/Viña.jpg" },
      { number: 60, name: "Valverde", team: "Uruguay", rarity: "Legend", image: "img/Uruguay/Valverde.jpg" },
      { number: 61, name: "Bentancur", team: "Uruguay", rarity: "Rare", image: "img/Uruguay/Bentancur.jpg" },
      { number: 62, name: "Ugarte", team: "Uruguay", rarity: "Rare", image: "img/Uruguay/Ugarte.jpg" },
      { number: 63, name: "De Arrascaeta", team: "Uruguay", rarity: "Rare", image: "img/Uruguay/De Arrascaeta.jpg" },
      { number: 64, name: "Pellistri", team: "Uruguay", rarity: "Common", image: "img/Uruguay/Pellistri.jpg" },
      { number: 65, name: "Maxi Araujo", team: "Uruguay", rarity: "Common", image: "img/Uruguay/Maxi Araujo.jpg" },
      { number: 66, name: "Darwin Núñez", team: "Uruguay", rarity: "Legend", image: "img/Uruguay/Darwin Núñez.jpg" },
      { number: 67, name: "Luis Suárez", team: "Uruguay", rarity: "Legend", image: "img/Uruguay/Luis Suárez.jpg" },
      { number: 68, name: "De La Cruz", team: "Uruguay", rarity: "Rare", image: "img/Uruguay/De La Cruz.jpg" },
      { number: 69, name: "Olivera", team: "Uruguay", rarity: "Common", image: "img/Uruguay/Olivera.jpg" },
      { number: 70, name: "Cáceres", team: "Uruguay", rarity: "Common", image: "img/Uruguay/Cáceres.jpg" },

    ];

     if (this.currentUser) {
        this.loadUserData();
    }
  }

  loadUserData() {

    if (!this.currentUser) return;

    const key = `album_${this.currentUser.username.toLowerCase()}`;

    const saved =
      JSON.parse(localStorage.getItem(key)) || [];

    this.myCollection = saved.map(savedSticker => {

      const original =
        this.stickers.find(
          s => s.number === savedSticker.number
        );

      return original || savedSticker;

    });

  }

  saveUserData() {
    if (!this.currentUser) return;

    const key = `album_${this.currentUser.username.toLowerCase()}`;

    localStorage.setItem(
      key,
      JSON.stringify(this.myCollection)
    );
  }

  async login(username, password) {

    const res = await fetch(
      "http://localhost:3000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.error || "Error en login"
      );
    }

    this.currentUser = data.user;

    localStorage.setItem(
      "currentUser",
      JSON.stringify(this.currentUser)
    );

    this.loadUserData();
  }

  logout() {

    this.currentUser = null;

    localStorage.removeItem("currentUser");
  }

  async fetchUsers() {

    const res =
      await fetch(
        "http://localhost:3000/api/users"
      );

    this.users = await res.json();
  }

  async fetchMessages() {

    const res =
      await fetch(
        "http://localhost:3000/api/messages"
      );

    this.messages = await res.json();
  }

  getCollection() {

    return this.myCollection;
  }

  addSticker(sticker) {
    this.myCollection.push(sticker);
    this.saveUserData();
  }

  removeSticker(number) {

    this.myCollection =
      this.myCollection.filter(
        s => s.number !== number
      );

    this.saveUserData();
  }

  getRepeatedStickers() {

    const repeated = [];

    this.myCollection.forEach(sticker => {

      const count =
        this.myCollection.filter(
          s =>
            s.number === sticker.number
        ).length;

      if (count > 1) {

        const exists =
          repeated.some(
            r =>
              r.number === sticker.number
          );

        if (!exists) {
          repeated.push(sticker);
        }
      }
    });

    return repeated;
  }

  getStickersByRarity(rarity) {

    return this.myCollection.filter(
      s =>
        s.rarity.toLowerCase() ===
        rarity.toLowerCase()
    );
  }

  async sendMessage(
    sender,
    receiver,
    text
  ) {

    const res = await fetch(
      "http://localhost:3000/api/messages",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify({
          sender,
          receiver,
          text
        })
      }
    );

    if (!res.ok) {

      const data = await res.json();

      throw new Error(
        data.error ||
        "Error enviando mensaje"
      );
    }

    const msg = await res.json();

    this.messages.push(msg);
  }

  async clearMessages() {

    const res = await fetch(
      "http://localhost:3000/api/messages",
      {
        method: "DELETE"
      }
    );

    if (!res.ok) {

      const data = await res.json();

      throw new Error(
        data.error ||
        "No se pudo borrar historial"
      );
    }

    this.messages = [];
  }

  openPack() {

    const PACK_PRICE = 100;

    if (this.coins < PACK_PRICE) {

      alert("No tenés presupuesto suficiente.");

      return [];
    }

    this.coins -= PACK_PRICE;

    const obtained = [];

    for (let i = 0; i < 5; i++) {

      const random =
        this.stickers[
        Math.floor(
          Math.random() *
          this.stickers.length
        )
        ];

      obtained.push(random);

      this.myCollection.push(random);
    }

    this.saveUserData();

    return obtained;
  }

  getAlbumStats() {

    const unique = [
      ...new Map(
        this.myCollection.map(
          s => [s.number, s]
        )
      ).values()
    ];

    return {
      owned: unique.length,
      total: this.stickers.length,
      missing:
        this.stickers.length -
        unique.length
    };
  }

  createTradeOffer(stickerNumber) {

    const trades =
      JSON.parse(
        localStorage.getItem("trades")
      ) || [];

    const sticker =
      this.myCollection.find(
        s =>
          s.number === stickerNumber
      );

    if (!sticker) return;

    trades.push({
      id: Date.now(),
      user:
        this.currentUser.username,
      sticker
    });

    localStorage.setItem(
      "trades",
      JSON.stringify(trades)
    );
  }


  createTradeRequest(
    toUser,
    offeredSticker,
    requestedSticker
  ) {

    console.log("GUARDANDO REQUEST");
    console.log(offeredSticker);
    console.log(requestedSticker);

    const requests =
      JSON.parse(
        localStorage.getItem("tradeRequests")
      ) || [];

    requests.push({
      id: Date.now(),
      from: this.currentUser.username,
      to: toUser,
      offeredSticker,
      requestedSticker,
      status: "pending"
    });

    localStorage.setItem(
      "tradeRequests",
      JSON.stringify(requests)
    );
  }

  getReceivedTradeRequests() {

    const requests =
      JSON.parse(
        localStorage.getItem(
          "tradeRequests"
        )
      ) || [];

    return requests.filter(
      r =>
        r.to ===
        this.currentUser.username
        &&
        r.status === "pending"
    );
  }

  getTrades() {

    return JSON.parse(
      localStorage.getItem("trades")
    ) || [];
  }

  getStickerPrice(sticker) {

    switch (sticker.rarity) {

      case "Legend":
        return 5000;

      case "Rare":
        return 2500;

      default:
        return 1000;
    }
  }

  sellSticker(number) {

    const index =
      this.myCollection.findIndex(
        s => s.number === number
      );

    if (index === -1) return;

    const sticker =
      this.myCollection[index];

    const price =
      this.getStickerPrice(sticker);

    this.coins += price;

    this.myCollection.splice(
      index,
      1
    );

    this.saveUserData();

    return price;
  }

  getTeams() {

    return [
      ...new Set(
        this.stickers.map(
          sticker => sticker.team
        )
      )
    ];

  }

  getStickersByTeam(team) {

    return this.stickers.filter(
      sticker => sticker.team === team
    );
  }

  getStickerProgress(team) {

    const teamStickers =
      this.getStickersByTeam(team);

    const owned =
      teamStickers.filter(
        sticker =>
          this.myCollection.some(
            s => s.number === sticker.number
          )
      );

    return {
      owned: owned.length,
      total: teamStickers.length
    };
  }

  getUserCollection(username) {
    return JSON.parse(
      localStorage.getItem(
        `album_${username.toLowerCase()}`
      )
    ) || [];
  }

  acceptTradeRequest(id) {

    const requests =
      JSON.parse(
        localStorage.getItem("tradeRequests")
      ) || [];

    const request =
      requests.find(r => r.id === id);

    if (!request) {
      console.log("Solicitud no encontrada");
      return false;
    }

    const fromCollection =
      this.getUserCollection(request.from);

    const toCollection =
      this.getUserCollection(request.to);

    console.log("FROM:", request.from);
    console.log("TO:", request.to);
    console.log("fromCollection:", fromCollection);
    console.log("toCollection:", toCollection);
    console.log("offeredSticker:", request.offeredSticker);
    console.log("requestedSticker:", request.requestedSticker);

    const offeredIndex =
      fromCollection.findIndex(
        s => s.number === request.offeredSticker.number
      );

    const requestedIndex =
      toCollection.findIndex(
        s => s.number === request.requestedSticker.number
      );

    console.log("offeredIndex:", offeredIndex);
    console.log("requestedIndex:", requestedIndex);

    if (
      offeredIndex === -1 ||
      requestedIndex === -1
    ) {
      alert(
        "No se pudo realizar el intercambio."
      );

      return false;
    }

    const offeredSticker =
      fromCollection[offeredIndex];

    const requestedSticker =
      toCollection[requestedIndex];

    fromCollection.splice(
      offeredIndex,
      1
    );

    toCollection.splice(
      requestedIndex,
      1
    );

    fromCollection.push(
      requestedSticker
    );

    toCollection.push(
      offeredSticker
    );

    localStorage.setItem(
      `album_${request.from.toLowerCase()}`,
      JSON.stringify(fromCollection)
    );

    localStorage.setItem(
      `album_${request.to.toLowerCase()}`,
      JSON.stringify(toCollection)
    );

    request.status = "accepted";

    localStorage.setItem(
      "tradeRequests",
      JSON.stringify(requests)
    );

    console.log("Intercambio realizado correctamente");

    return true;
  }

  rejectTradeRequest(id) {

    const requests =
      JSON.parse(
        localStorage.getItem("tradeRequests")
      ) || [];

    const request =
      requests.find(r => r.id === id);

    if (!request) return;

    request.status = "rejected";

    localStorage.setItem(
      "tradeRequests",
      JSON.stringify(requests)
    );
  }

  async register(username, password) {

    const res = await fetch(
      "http://localhost:3000/api/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password,
          role: "user"
        })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.error || "Error en registro"
      );
    }

    return data;
  }
}