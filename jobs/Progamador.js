var schedule = require('node-schedule');
var funciones = require('./FuncionJob');
/**
 * Clase encargada de manejar todos los trabajos de actualizacion
 * programados. La instancia de esta clase debe ser un singleton
 */
class Programador {
    
    constructor(){
        this.jobs = {};
    }

    programarJob(job){
        let segundos = Math.floor(Math.random() * 60);
        if(job._id in this.jobs){
            this.jobs[job._id].cancel();
        }
        
        this.jobs[job._id] = schedule.scheduleJob(`${segundos} */${job.minutos} * * * *`, function(){
            funciones(job);
        });
    }

    programarJobs(jobs){
        jobs.forEach(job => {
            let segundos = Math.floor(Math.random() * 60);
            this.jobs[job._id] = schedule.scheduleJob(`${segundos} */${job.minutos} * * * *`, function(){
                funciones(job);
            });
        });
    }

    cancelarJob(jobId){
        if(jobId in this.jobs){
            this.jobs[jobId].cancel();
            delete this.jobs[jobId];
        }
    }
}

module.exports = Programador;