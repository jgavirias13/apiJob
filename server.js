const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      dbConfig = require('./Db'),
      ProgramadorSingleton = require('./jobs/ProgramadorSingleton'),
      Job = require('./models/Job');

//Conexion con la base de datos
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.DB, { useNewUrlParser: true}).then(
    () => {
        console.log('Database is connected');
        obtenerJobs();
    },
    err => {console.log(`Can not connect to the database ${err}`)}
);

//Inicializacion del server
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.options('*', cors());

const jobRoute = require('./routes/job.routes');
const estacionRoute = require('./routes/estacion.routes');

app.use('/job', jobRoute);
app.use('/estacion', estacionRoute);
let port = process.env.PORT || 4000;

const server = app.listen(port, function(){
    console.log(`Listening on port ${port}`);
});

function obtenerJobs(){
    Job.find(function(err, jobs){
        programador = ProgramadorSingleton.instance;
        programador.programarJobs(jobs);
    });
}