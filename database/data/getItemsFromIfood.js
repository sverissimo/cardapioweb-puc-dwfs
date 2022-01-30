const
    fs = require('fs')
    , produtos = require('./produtos.json')
    , amarelimEntradas = require('./amarelim/amarelimEntradas.json')
    , amarelimMainCourses = require('./amarelim/amarelimMainCourses.json')
    , amarelimBebidas = require('./amarelim/amarelimBebidas.json')
    , amarelimSobremesas = require('./amarelim/amarelimSobremesas.json')
    , galetoItaliaEntradas = require("./galetoItalia/galetoItaliaEntradas.json")
    , galetoItaliaMainCourses = require("./galetoItalia/galetoItaliaMainCourses.json")
    , galetoItaliaBebidas = require("./galetoItalia/galetoItaliaBebidas.json")
    , galetoItaliaSobremesas = require("./galetoItalia/galetoItaliaSobremesas.json")



const getMenuFromIfood = () => {

    const formattedMenu = []

    for (let item of produtos) {
        formattedMenu.push(item)
    }

    const
        amarelimMenu = [amarelimEntradas, amarelimMainCourses, amarelimBebidas, amarelimSobremesas]
        , galetoItaliaMenu = [galetoItaliaEntradas, galetoItaliaMainCourses, galetoItaliaBebidas, galetoItaliaSobremesas]
        , allRestaurants = [amarelimMenu, galetoItaliaMenu]

    let
        categoria_id = 1
        , restaurante_id = 1

    for (let restaurant of allRestaurants) {

        for (let categoria of restaurant) {
            categoria.forEach(({ description, details, unitMinPrice }) => {
                formattedMenu.push({
                    nome: description,
                    descricao: details || '',
                    preco: unitMinPrice,
                    ativo: true,
                    categoria_id,
                    restaurante_id
                });
            })
            categoria_id++
        }
        categoria_id = 1
        restaurante_id++
    }

    fs.writeFileSync('importedMenu.json', JSON.stringify(formattedMenu))
}

getMenuFromIfood()

module.exports = getMenuFromIfood