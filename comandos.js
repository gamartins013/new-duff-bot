const consultaCep = require('./modulos/consulta-cep/index.js')
const covid = require ('./modulos/api-covid/index.js')
const play = require('./modulos/playMusic/index.js')
const clima = require('./modulos/clima/index.js')
const sticker = require('./modulos/sticker/index.js')
const audioSextou = require ('./modulos/audios/index.js')
const atividades = require ('./modulos/atividades/index.js')
const consultaCnpj = require ('./modulos/consulta-cnpj/index.js')


const comandos = {
    '!cep': {
        'pasta': consultaCep,
        'status': true
    },
    '!covid': {
        'pasta': covid,
        'status': true
    },
    '!play':{
        'pasta': play,
        'status': true
    },
    '!clima':{
        'pasta': clima,
        'status': true
    },
    '!s':{
        'pasta': sticker,
        'status': true
    },
    'sextou': {
        'pasta': audioSextou,
        'status': true
    },
    '!atividades': {
        'pasta': atividades,
        'status': true
    },
    '!cnpj':{
        'pasta': consultaCnpj,
        'status': true
    }
}

module.exports = comandos;