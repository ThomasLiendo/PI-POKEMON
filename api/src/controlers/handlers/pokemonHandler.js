const {
  findByName,
  createPokemons,
  findAllPokemons,
  findById,

  findByIdApi,
} = require("../pokemon.controller");

const createPokemonHandler = async (req, res) => {
  const { name, type, hp, attack, defense, speed, height, weight, image } =
    req.body;

  try {
    const newPokemon = await createPokemons(
      name,
      type,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image
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
    const pokemon = id ? await findByIdApi(id) : await findById(id);
    res.status(200).json(pokemon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getPokemonHandler,
  getPokemonByIdHandler,
  createPokemonHandler,
};
