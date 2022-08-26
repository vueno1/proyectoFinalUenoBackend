const mongoose = require("mongoose");
const mensajeCollection = "mensajes"; 

const mensajeSchema = new mongoose.Schema({
    email: {type:String, require:true},
    mensaje: {type: String, require:true},
    timestamp: {type:Date, default:Date.now()}
});

const Mensaje  = mongoose.model(
    mensajeCollection, 
    mensajeSchema
); 

module.exports = Mensaje