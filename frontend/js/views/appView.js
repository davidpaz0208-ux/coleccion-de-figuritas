export default class AppView {

    hideAll() {

        document
            .querySelectorAll("section")
            .forEach(sec => sec.style.display = "none");

        const menu =
            document.getElementById("mainMenu");

        if (menu)
            menu.style.display = "none";
    }

    showLogin() {

        this.hideAll();

        const login =
            document.getElementById("loginSection");

        if (login)
            login.style.display = "block";
    }

    showMenu(username, role) {

        this.hideAll();

        const menu =
            document.getElementById("mainMenu");

        if (menu)
            menu.style.display = "block";

        const welcome =
            document.getElementById("menuWelcomeMsg");

        if (welcome)
            welcome.innerText =
                `Bienvenido, ${username}`;

        const userManagement =
            document.getElementById("btnUserManagement");

        if (userManagement) {

            userManagement.style.display =
                role === "admin"
                    ? "inline-block"
                    : "none";
        }
    }

    showSection(id) {

        this.hideAll();

        const section =
            document.getElementById(id);

        if (section)
            section.style.display = "block";
    }

    renderUsers(users) {

        const list =
            document.getElementById("usersList");

        if (!list) return;

        list.innerHTML = "";

        if (!users.length) {

            list.innerHTML =
                "<li>No hay usuarios registrados.</li>";

            return;
        }

        users.forEach(user => {

            const li =
                document.createElement("li");

            li.className = "user-card";

            const isAdmin =
                user.role === "admin";

            li.innerHTML = `

            <div class="user-data">

                <strong>
                    ${user.username}
                </strong>

                <span class="user-role ${isAdmin
                    ? "admin-role"
                    : "user-role"
                }">
                    ${isAdmin
                    ? "Administrador"
                    : "Usuario"
                }
                </span>

            </div>

            <div class="user-action">

                ${isAdmin

                    ?

                    `
                    <span class="current-admin">
                        Administrador
                    </span>
                    `

                    :

                    `
                    <button
                        class="deleteUserBtn"
                        data-id="${user.id}"
                        data-username="${user.username}">
                        🗑️ Eliminar
                    </button>
                    `
                }

            </div>

        `;

            list.appendChild(li);

        });

    }

    renderChatUsers(users, currentUser) {

        const select =
            document.getElementById("selectChatUser");

        if (!select) return;

        select.innerHTML = "";

        users
            .filter(
                u => u.username !== currentUser.username
            )
            .forEach(u => {

                const option =
                    document.createElement("option");

                option.value = u.username;
                option.textContent = u.username;

                select.appendChild(option);
            });
    }

    renderMessages(
        messages,
        currentUser,
        selectedUser
    ) {

        const list =
            document.getElementById("chatMessagesList");

        if (!list) return;

        list.innerHTML = "";

        const filtered =
            messages.filter(m =>

                (m.sender === currentUser &&
                    m.receiver === selectedUser)

                ||

                (m.sender === selectedUser &&
                    m.receiver === currentUser)
            );

        if (!filtered.length) {

            list.innerHTML =
                "<li>No hay mensajes</li>";

            return;
        }

        filtered.forEach(m => {

            const li =
                document.createElement("li");

            li.innerHTML =
                `<strong>${m.sender}</strong>: ${m.text}`;

            list.appendChild(li);
        });
    }

    renderCollection(stickers, listId = "collectionList") {

        const list =
            document.getElementById(listId);

        if (!list) return;

        list.innerHTML = "";

        if (!stickers.length) {

            list.innerHTML =
                "<li>No hay figuritas.</li>";

            return;
        }

        const isMarket =
            listId === "marketList";

        stickers.forEach(sticker => {

            let price = 1000;

            if (sticker.rarity === "Rare")
                price = 2500;

            if (sticker.rarity === "Legend")
                price = 5000;

            const li =
                document.createElement("li");

            li.className =
                "sticker-card";

            li.innerHTML = `
            <img
                src="${sticker.image || 'img/stickers/default.jpg'}"
                alt="${sticker.name}"
                class="sticker-img">

            <div class="sticker-info">
                <h3>#${sticker.number}</h3>
                <p>${sticker.name}</p>
                <p>${sticker.team}</p>

                <span class="rarity ${sticker.rarity.toLowerCase()}">
                    ${sticker.rarity}
                </span>

                <p>💰 $${price}</p>
            </div>

            <div class="sticker-actions">

                ${isMarket
                    ? `
                    <button
                        class="buyBtn"
                        data-number="${sticker.number}">
                        Comprar
                    </button>
                    `
                    : `
                    <button
                        class="sellBtn"
                        data-number="${sticker.number}">
                        Vender
                    </button>

                    <button
                        class="tradeBtn"
                        data-number="${sticker.number}">
                        Intercambiar
                    </button>
                    `
                }

            </div>
        `;

            list.appendChild(li);
        });
    }

    renderRepeated(stickers) {

        const list =
            document.getElementById("repeatedList");

        if (!list) return;

        list.innerHTML = "";

        stickers.forEach(s => {

            const li =
                document.createElement("li");

            li.innerHTML =
                `🔁 ${s.name}`;

            list.appendChild(li);
        });
    }

    renderAlbum(total, owned) {

        const albumCount =
            document.getElementById("albumCount");

        const missingCount =
            document.getElementById("missingCount");

        if (albumCount)
            albumCount.innerText = owned;

        if (missingCount)
            missingCount.innerText =
                total - owned;
    }

    renderAlbumByTeam(stickers, myCollection) {

        const grid =
            document.getElementById("albumGrid");

        if (!grid) return;

        grid.innerHTML = "";

        stickers.forEach(sticker => {

            const owned =
                myCollection.some(
                    s => s.number === sticker.number
                );

            const card =
                document.createElement("div");

            card.className =
                "album-card";

            card.innerHTML = `
    <img
        src="${owned ? sticker.image : 'img/back.png'}"
        class="album-img">

    <div class="album-info">
        <h4>#${sticker.number}</h4>
        <p>${sticker.name}</p>
        <p>${sticker.team}</p>

        ${owned
                    ? `<span class="owned">✔ Conseguida</span>`
                    : `<span class="missing">Falta conseguir</span>`
                }
    </div>
`;

            grid.appendChild(card);
        });
    }

    renderAlbumTeams(teams) {

        const container =
            document.getElementById("teamsList");

        if (!container) return;

        container.innerHTML = "";

        teams.forEach(team => {

            const li =
                document.createElement("li");

            li.innerHTML = `
                <button
                    class="albumTeamBtn"
                    data-team="${team}">
                    ${team}
                </button>
            `;

            container.appendChild(li);
        });
    }

    renderTeams(teams) {

        const list =
            document.getElementById("teamsList");

        if (!list) return;

        list.innerHTML = "";

        teams.forEach(team => {

            const li =
                document.createElement("li");

            li.innerHTML =
                `<button class="teamBtn">${team}</button>`;

            list.appendChild(li);
        });
    }

    updateCoins(coins) {

        const coinsDisplay =
            document.getElementById("coinsDisplay");

        if (coinsDisplay) {

            coinsDisplay.innerText =
                `💰 $${coins}`;
        }
    }
}