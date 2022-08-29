const mongoose = require("mongoose");
const ordenCollection = "orden"; 

const ordenSchema = new mongoose.Schema({
    email: {type:String, require:true},
    orden: {type: String},
    productos: {type: Array, require:true},
    timestamp: {type:Date, default:Date.now()}
});

const Orden  = mongoose.model(
    ordenCollection, 
    ordenSchema
); 

module.exports = Orden