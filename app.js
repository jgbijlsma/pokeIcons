const pokemonContainer = document.querySelector("#pokemonContainer");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

let offset = 0;

getAllPokemon();

async function getAllPokemon() {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
  );
  const data = await response.json();

  data.results.forEach((pokemon) => {
    getSinglePokemon(pokemon.url);
  });
}

async function getSinglePokemon(url) {
  const response = await fetch(url);
  const data = await response.json();

  createPokemonImage(data.sprites.front_default);
}

function createPokemonImage(spriteUrl) {
  const imgEl = document.createElement("img");
  imgEl.setAttribute("src", spriteUrl);
  imgEl.setAttribute("alt", "Pokemon sprite");
  pokemonContainer.append(imgEl);
}

nextBtn.addEventListener("click", () => {
  offset += 20;
  pokemonContainer.innerHTML = "";
  getAllPokemon();
});

prevBtn.addEventListener("click", () => {
  if (offset - 20 >= 0) {
    offset -= 20;
    pokemonContainer.innerHTML = "";
    getAllPokemon();
  }
});
