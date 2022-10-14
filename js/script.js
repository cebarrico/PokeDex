const pokeName = document.querySelector(".poke-name");
const pokeNum = document.querySelector(".poke-num");
const search = document.querySelector(".search");
const pokeImg = document.querySelector(".pokemon-img");
const form = document.querySelector("form");
const pokeType = document.querySelector(".pokemon-type");
const btmNext = document.querySelector(".btm-next");
const btmPrev = document.querySelector(".btm-previous");

let pokemonSearch = 0;
async function pokemonSearchApi(pokemon) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (data.status == 200) {
    const dataJson = await data.json();
    console.log(dataJson);
    return dataJson;
  }
}

async function renderPokemon(pokemon) {
  pokeName.innerHTML = "Buscando...";

  const data = await pokemonSearchApi(pokemon);
  if (data) {
    pokeImg.style.display = "flex";
    pokeName.innerHTML = data.name;
    pokeNum.innerHTML = data.id;
    pokeType.innerHTML = data.types.map((typeInfo) => typeInfo.type.name);
    pokeImg.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    search.value = "";
    pokemonSearch = data.id;
  } else {
    pokeName.innerHTML = "Não Encontrado";
    pokeImg.style.display = "none";
    pokeType.innerHTML = "";
    pokeNum.innerHTML = "";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  renderPokemon(search.value.toLowerCase());
});

btmNext.addEventListener("click", () => {
  pokemonSearch += 1;
  renderPokemon(pokemonSearch);
});

btmPrev.addEventListener("click", () => {
  if (pokemonSearch > 1) {
    pokemonSearch -= 1;
    renderPokemon(pokemonSearch);
  }
});
