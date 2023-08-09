const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('strictQuery', true);
const PokemonTypeSchema = new mongoose.Schema({ 
    value: { 
        type: String, 
        enum: [ "Bug", "Dark", "Dragon", "Electric", "Fairy", 
                "Fighting", "Fire", "Flying", "Ghost", "Grass", 
                "Ground", "Ice", "Normal", "Poison", "Psychic", 
                "Rock", "Steel", "Unknow", "Water"] 
            } 
    }
);
const Pokemon = new Schema({
    number: { type: Number, required: true, default: 1 }, 
    name: { type: String, required: true },
    type_1: { type: String, enum: [ 
        "Bug", "Dark", "Dragon", "Electric", "Fairy", 
        "Fighting", "Fire", "Flying", "Ghost", "Grass", 
        "Ground", "Ice", "Normal", "Poison", "Psychic", 
        "Rock", "Steel", "Unknow", "Water", '']},
    type_2: { type: String, enum: [ 
        "Bug", "Dark", "Dragon", "Electric", "Fairy", 
        "Fighting", "Fire", "Flying", "Ghost", "Grass", 
        "Ground", "Ice", "Normal", "Poison", "Psychic", 
        "Rock", "Steel", "Unknow", "Water", ""]},
    image: { type: String, required: true },
    hp: { type: Number, required: true },
    attack: { type: Number, required: true },
    defense: { type: Number, required: true },
    speed: { type: Number, required: true },
    legendary: { type: Boolean, required: true },
    total: { type: Number, required: true },
});
const pokemonModel = mongoose.model('Pokemon', Pokemon);
module.exports = pokemonModel;

// Pokemon.pre('save', function(next) {
//     var doc = this;
//     pokemonModel.findByIdAndUpdate
// });