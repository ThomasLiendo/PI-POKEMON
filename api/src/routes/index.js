const { Router } = require("express");
const Pokemon = require("./pokemonRouter");
const Type = require("./typeRouter");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/pokemons", Pokemon);
//ante cualquier peticion a /pokemons que vaya a pokemonRouter
router.use("/types", Type);
//ante cualquier peticion a /types que vaya a typeRouter

module.exports = router;
