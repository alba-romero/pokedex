const boton = document.getElementById("botonBuscar");
const input = document.getElementById("pokemonInput");
const pokemonInfo = document.getElementById("PokemonInfo");
const pokemonLista = document.getElementById("pokemonLista");

// OBTENER LA LISTA DE POKÉMON
fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
    .then(response => response.json())
    .then(data => {

        data.results.forEach(pokemon => {

            pokemonLista.innerHTML += `
                <button class="pokemon-list-item">
                    ${pokemon.name}
                </button>
            `;

        });

    });


// BUSCAR UN POKÉMON CON EL BOTÓN
boton.addEventListener("click", () => {

    const pokemon = input.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    fetch(url)
        .then(Response => {

            if (!Response.ok) {
                throw new Error("Pokémon no encontrado.");
            }

            return Response.json();

        })
        .then(data => {

            const altura = data.height / 10;
            const peso = data.weight / 10;

            const nombresEstadisticas = {
                hp: "PS",
                attack: "Ataque",
                defense: "Defensa",
                "special-attack": "Ataque especial",
                "special-defense": "Defensa especial",
                speed: "Velocidad"
            };

            const estadisticas = data.stats.map(stat => {

                const nombre = nombresEstadisticas[stat.stat.name];
                const porcentaje = (stat.base_stat / 255) * 100;

                return `
                    <div class="stat">
                        <div class="stat-info">
                            <span>${nombre}</span>
                            <span>${stat.base_stat}</span>
                        </div>

                        <div class="stat-bar">
                            <div class="stat-fill ${stat.stat.name}" style="width: ${porcentaje}%"></div>
                        </div>
                    </div>
                `;

            });

            const tipos = data.types.map(tipo => tipo.type.name);

            const nombresTipos = {
                normal: "Normal",
                fire: "Fuego",
                water: "Agua",
                electric: "Eléctrico",
                grass: "Planta",
                ice: "Hielo",
                fighting: "Lucha",
                poison: "Veneno",
                ground: "Tierra",
                flying: "Volador",
                psychic: "Psíquico",
                bug: "Bicho",
                rock: "Roca",
                ghost: "Fantasma",
                dragon: "Dragón",
                dark: "Siniestro",
                steel: "Acero",
                fairy: "Hada"
            };

            const nombrePokemon =
                data.name.charAt(0).toUpperCase() + data.name.slice(1);

            pokemonInfo.innerHTML = `
                <div class="pokemon-card">

                    <h2>#${data.id} ${nombrePokemon}</h2>

                    <img class="pokemon-image" src="${data.sprites.front_default}">

                    <div class="types">
                        ${tipos.map(tipo => `
                            <span class="type ${tipo}">
                                ${nombresTipos[tipo]}
                            </span>
                        `).join("")}
                    </div>

                    <div class="pokemon-details">
                        <p>Altura: ${altura} m</p>
                        <p>Peso: ${peso} kg</p>
                    </div>

                    <h3>Estadísticas</h3>

                    <div class="stats">
                        ${estadisticas.join("")}
                    </div>

                </div>
            `;

        })
        .catch(error => {
            pokemonInfo.innerHTML = `<p>${error.message}</p>`;
        });

});