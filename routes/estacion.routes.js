const express = require('express');
const app = express();
const estacionRoutes = express.Router();

let Estacion = require('../models/Estacion');

estacionRoutes.route('/').get(function(req, res){
    Estacion.find(function(err, estaciones){
        if(err){
            console.log(err);
        }else{
            res.json(estaciones);
        }
    })
});
module.exports = estacionRoutes;