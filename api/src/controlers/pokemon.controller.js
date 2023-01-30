const { Pokemon, Type } = require("../db");
const axios = require("axios");
const { response } = require("express");

const urlPokemons = "https://pokeapi.co/api/v2/pokemon";
const urlTypes = "https://pokeapi.co/api/v2/type";

//traemos todo lo que hay en databasePokemons y todo lo que hay en apiPokemons

// POKEMON.CONTROLLERS FOR API

const findAllApi = async () => {
  //funcion asincrona
  const apiUrl = await axios.get(urlPokemons + `?limit=40`); //obtengo el array results: [{name + url de los primeros 40}]
  const pokeUrl = []; // uso este array para poner la url de cada pokemon despues de realizar el foreach
  apiUrl.data.results.forEach((el) => {
    pokeUrl.push(axios.get(el.url).then((resp) => resp.data)); //pusheo el contenido de la url de c/pokemon(obj {name, id, img, etc})
  });
  const apiInfo = Promise.all(pokeUrl) //Promise.all espera que todas las promesas se cumplan y si se da...
    .then((res) =>
      res.map((p) => {
        //toma la respuesta y mapea por cada pokemon la info necesaria
        return {
          id: p.id,
          name: p.name,
          img: p.sprites.versions["generation-vi"]["omegaruby-alphasapphire"]
            .front_default,
          type: p.types.map((el) => el.type.name),
          health: p.stats[0].base_stat,
          attack: p.stats[1].base_stat,
          defense: p.stats[2].base_stat,
          speed: p.stats[5].base_stat,
          height: p.height,
          weight: p.weight,
        }; //devuelve toda la info
      })
    );
  return await apiInfo; //espera a que apiInfo reciba toda la info y cuando termina getApiInfo() devuelve esa const si la ejecutamos
};
const findAllDb = async () => {
  const pokemons = await Pokemon.findAll();
  return pokemons;
};

const findByName = async (name) => {
  const findName = await findAllPokemons();
  let pokemonName = findName.filter(
    (p) => p.name.toLowerCase().includes(name.toLowerCase())
    // aca lo que hacemos es al poner tolowercase es filtrar los nombres que pongamos en el buscador para asi nos aparezcan todos con solo poner una letra o la mitad de un nombre. Ej (char => charizard, charmeleon, charmander)
  );
  console.log(pokemonName);
  return pokemonName;
};

//POKEMON.CONTROLLERS FOR DATABASE

const createPokemons = async (
  name,
  type,
  hp,
  attack,
  defense,
  speed,
  height,
  weight
) => {
  const pokemonCreate = await Pokemon.create({
    name,
    type,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
  });

  return pokemonCreate;
};

const findAllPokemons = async () => {
  const pokemons = await findAllDb();
  const pokemonApi = await findAllApi();
  return pokemonApi.concat(pokemons);
};

const findById = async (id) => {
  const pokemon = await Pokemon.findByPk(id);
  return pokemon;
};

const findByIdApi = async (id) => {
  const findId = await findAllApi();
  let pokemonId = await findId.filter((p) => p.id == id);
  if (pokemonId.length) return pokemonId;
  else throw Error("Not found Pokemon by Id");
};

// TYPES.CONTROLLERS

const getTypesApi = async () => {
  const response = await axios.get(urlTypes);
  const types = response.data.results;
  const typeNames = [];
  for (let type of types) {
    let existingType = await Type.findOne({ where: { name: type.name } }); // lo que hago aca es buscar si ya tengo un type con tal nombre lo guardo en vez de crear otro para evitar pisar el id
    if (existingType) {
      typeNames.push(existingType);
    } else {
      const newType = await Type.create({
        name: type.name,
      });
      typeNames.push(newType);
    }
  }
  return typeNames;
};

// ACA SE VAN HACER LAS PETICIONES DEL FRONT AL BACK MEDIANTE UNA REQUEST Y UNA POSTERIOR RESPONSE
// ESTA COMUNICACION SE VA A REALIZAR MEDIANTE UN DETERMINADO MARCO/REGLA, MEDIANTE EL PROTOCOLO HTTP QUE ESTABLECE LAS REGLAS DICHAS MEDIANTE METODOS(GET, POST, PUT, DELETE)
//get: pedir info
//post: crear
//put: modificar
//delete: eliminar

module.exports = {
  getTypesApi,
  findAllApi,
  findById,
  findByName,
  createPokemons,
  findAllPokemons,
  findByIdApi,
  findAllDb,
};

// LOS CONTROLADORES SON LOS QUE INTERACTUAN CON EL MODELO
