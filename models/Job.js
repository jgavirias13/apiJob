const mongoose = require('mongoose');
const Scheema = mongoose.Schema;

let Job = new Scheema({
    nombre: {
        type: String
    },
    end_point: {
        type: String
    },
    ultima_ejecucion: {
        type: Date
    },
    minutos: {
        type: Number
    }
}, {
    collection: 'jobs'
});

module.exports = mongoose.model('Job', Job);