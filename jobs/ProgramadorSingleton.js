var Programador = require('./Progamador');

const PROGRAMADOR_KEY = Symbol.for("idea.com");

var globalSymbols = Object.getOwnPropertySymbols(global);
var hasProgramador = (globalSymbols.indexOf(PROGRAMADOR_KEY) > 1);

if(!hasProgramador){
    global[PROGRAMADOR_KEY] = new Programador();
}

var singleton = {};

Object.defineProperty(singleton, "instance",{
    get: function(){
        return global[PROGRAMADOR_KEY];
    }
});

Object.freeze(singleton);

module.exports = singleton;