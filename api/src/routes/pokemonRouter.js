const { Router } = require("express");
const router = Router();
const {
  getPokemonHandler,
  getPokemonByIdHandler,
  createPokemonHandler,
} = require("../controlers/handlers/pokemonHandler");

router.get("/", getPokemonHandler);

// res.send("Esta ruta trae toda la info de los pokemons");

router.get("/:id", getPokemonByIdHandler);

router.post("/", createPokemonHandler);

module.exports = router;
// ESTOS SON LOS ENDPOINTS

//get: pedir info
//post: crear
//put: modificar
//delete: eliminar
