const express = require('express');
const router = express.Router()
const PokemonController = require('../app/controllers/PokemonController.js');

router.get('/', PokemonController.getPokemon)
router.get('/:id', PokemonController.getPokemonById)
router.post('/', PokemonController.createPokemon)
router.delete('/:id', PokemonController.deletePokemon)
router.put('/:id', PokemonController.updatePokemon)
// add error handler
router.use(PokemonController.errHandler)



module.exports = router;
