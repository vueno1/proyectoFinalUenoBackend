const mongoose = require("mongoose");
const mensajeCollection = "mensajes"; 

const mensajeSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    mensaje: {type: String, require:true}
});

const Mensaje  = mongoose.model(
    mensajeCollection, 
    mensajeSchema
); 

module.exports = Mensaje