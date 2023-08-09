const PokemonRoute = require('./pokemonRoute')
function route(app) {
    app.use('/api/pokemon', PokemonRoute)
}
module.exports = route;