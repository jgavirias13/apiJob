const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Scheema = mongoose.Schema;

var ScheemaTypes = mongoose.Schema.Types;

let Estacion = new Scheema({
    codigo: {
        type: Number
    },
    ica: {
        type: Number
    },
    ultima_actualizacion: {
        type: Date
    },
    nombre: {
        type: String
    },
    categoria: {
        type: String
    },
    latitud: {
        type: ScheemaTypes.Double
    },
    longitud: {
        type: ScheemaTypes.Double
    }
}, {
    collection: 'estaciones'
});

module.exports = mongoose.model('Estacion', Estacion);