const express = require('express');
const router = express.Router()
const PokemonController = require('../app/controllers/PokemonController.js');

router.get('/', PokemonController.getPokemon)
router.post('/', PokemonController.createPokemon)

// add error handler
router.use(PokemonController.errHandler)



module.exports = router;
