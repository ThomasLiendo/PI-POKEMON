const {
  findByName,
  createPokemons,
  findAllPokemons,
  findById,

  findByIdApi,
} = require("../pokemon.controller");
const isUUID = require("is-uuid");

const createPokemonHandler = async (req, res) => {
  const { name, type, health, attack, defense, speed, height, weight, img } =
    req.body;

  try {
    const newPokemon = await createPokemons(
      name,
      type,
      health,
      attack,
      defense,
      speed,
      height,
      weight,
      img
    );
    // res.status(200).json(newPokemon);
    res.status(200).send(`Pokemon added to the pokedex`);
    return newPokemon;
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPokemonHandler = async (req, res) => {
  try {
    const { name } = req.query;

    const results = name ? await findByName(name) : await findAllPokemons();

    res.status(200).json(results);
  } catch (error) {
    res.send(404).json("Error not Pokemon Found");
  }
};

const getPokemonByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const pokemon = isUUID.v4(id) ? await findById(id) : await findByIdApi(id);
    //isUUID.v4 sirve para hacer la comprobacion de este tipo de dato con id
    isUUID.v4(id)
      ? res.status(200).json([pokemon])
      : res.status(200).json(pokemon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getPokemonHandler,
  getPokemonByIdHandler,
  createPokemonHandler,
};
