const Siata = require('../Siata'),
      request = require('request'),
      Estacion = require('../models/Estacion');

function ActualizarDB(job){
    var today = new Date();
    job.ultima_ejecucion = today;
    job.save();
    console.log(`-- Ejecutando job: ${job.nombre} - ${today.toUTCString()}`);
    var destino = `${Siata.API}${job.end_point}/${Siata.Token}`;
    console.log(destino);
    request(destino, {json: true}, (err, res) => {
        if(err){
            console.log(err);
        }else{
            res.body.datos.forEach(element => {
                Estacion.findOne({codigo: element.codigo}, function(err, res){
                    if(!res){
                        let estacion = new Estacion({
                            codigo: element.codigo,
                            ica: element.valorICA,
                            ultima_actualizacion: new Date(element.ultimaActualizacion),
                            nombre: element.nombre,
                            categoria: element.categoria,
                            latitud: element.coordenadas[0].latitud,
                            longitud: element.coordenadas[0].longitud
                        });
                        estacion.save();
                    }else{
                        res.ica = element.valorICA;
                        res.ultima_actualizacion = new Date(element.ultimaActualizacion);
                        res.categoria = element.categoria;
                        res.save();
                    }
                });
                
            });
        }
    });
}

module.exports = ActualizarDB;