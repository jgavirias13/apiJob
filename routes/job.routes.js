const express = require('express');
const app = express();
const jobRoutes = express.Router();
const ProgramadorSingleton = require('../jobs/ProgramadorSingleton');

let Job = require('../models/Job');

jobRoutes.route('/add').post(function(req, res){
    let job = new Job(req.body);
    job.save().then(job => {
        programador = ProgramadorSingleton.instance;
        programador.programarJob(job);
        res.status(200).json({'job' : 'Job added'});
    }).catch(err => {
        res.status(400).send("Unable to save to database");
    });
});

jobRoutes.route('/').get(function(req, res){
    Job.find(function(err, jobs){
        if(err){
            console.log(err);
        }else{
            res.json(jobs);
        }
    })
});

jobRoutes.route('/edit/:id').get(function(req, res){
    let id = req.params.id;
    Job.findById(id, function(err, job){
        if(err){
            console.log(err);
        }else{
            res.json(job);
        }
    });
});

jobRoutes.route('/update/:id').post(function(req, res){
    let id = req.params.id;
    Job.findById(id, function(err, job){
        if(!job){
            res.status(400).send('Unable to find the job');
        }else{
            job.nombre = req.body.nombre;
            job.end_point  = req.body.end_point;
            job.minutos = req.body.minutos;

            job.save().then(job => {
                programador = ProgramadorSingleton.instance;
                programador.programarJob(job);
                res.json('Update complete');
            }).catch(err => {
                res.status(400).send('Unable to update the database');
            });
        }
    });
});

jobRoutes.route('/delete/:id').get(function(req, res){
    let id_p = req.params.id;
    Job.findByIdAndDelete(id_p, function(err, job){
        if(err){
            res.json(err);
        }else{
            res.json('Deleted success');
            programador = ProgramadorSingleton.instance;
            programador.cancelarJob(id_p);
        }
    })
});

module.exports = jobRoutes;