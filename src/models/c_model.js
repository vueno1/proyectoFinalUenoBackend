const mongoose = require("mongoose");
const carritoCollection = "carritos"; 

const carritoSchema = new mongoose.Schema({
    productos: {type: Array, required: true},
    direccionEntrega: {type: String},
    timestamp: {type: Date, default:Date.now()}
});

const Carrito = mongoose.model(
    carritoCollection, 
    carritoSchema
); 

module.exports = Carrito