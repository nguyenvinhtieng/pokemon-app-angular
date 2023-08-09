const fs = require('fs');
const multiparty = require('multiparty');
const Pokemon = require('../models/Pokemon');


class PokemonController {
    async getPokemon(req, res, next) {
        try {
            const pokemon = await Pokemon.find();
            return res.status(200).json({
                data: pokemon
            });
        } catch(err) {
            next(err);
        }
    }


    async createPokemon(req, res, next) {
        try {
            const form = new multiparty.Form();
            form.parse(req, async (err, fields, files) => {
                if(err) return next(err);
                const name = fields.name[0];
                const type_1 = fields.type_1[0].trim();
                const type_2 = fields.type_2[0].trim();
                const hp = fields.hp[0];
                const attack = fields.attack[0];
                const defense = fields.defense[0];
                const speed = fields.speed[0];
                const legendary = fields.isLegendary[0];
                const image = files.image[0];
                const imageLink = "./src/public/images/" + image.originalFilename
                const imageActualyLink = "/images/" + image.originalFilename
                if(!name || !hp || !attack || !defense || !speed || !image) {
                    return res.status(400).json({ message: 'All fields are required' });
                }
                fs.copyFile(image.path, imageLink, function (err) {
                    if (err) throw err
                    console.log('File moved')
                })
                const pokemonCount = await Pokemon.countDocuments();
                let total = Number(hp) + Number(attack) + Number(defense) + Number(speed);
                const pokemon = new Pokemon({
                    number: pokemonCount + 1,
                    name,
                    type_1,
                    type_2,
                    hp,
                    attack,
                    defense,
                    speed,
                    legendary,
                    total,
                    image: imageActualyLink
                });
                await pokemon.save();
                return res.status(200).json({
                    data: pokemon
                });
            });
        } catch(err) {
            next(err);
        }
    }

    async deletePokemon(req, res, next) {
        try {
            const { id } = req.params;
            const pokemon = await Pokemon.findByIdAndDelete(id);
            // validate
            if(!pokemon) {
                return res.status(404).json({ message: 'Pokemon not found' });
            }

            return res.json(pokemon);
        } catch(err) {
            next(err);
        }
    }


    errHandler(err, res) {
        return res.json({
            message: err.message || 'Something went wrong'
        })
    }
}

module.exports = new PokemonController();
