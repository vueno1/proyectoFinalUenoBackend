const log4js = require("../../config/log")
const logger = log4js.getLogger()

const {
    getOrden,
    postOrden
 
} = require("../../services/orden/orden.service")

const {getCarrito} = require("../../services/carrito/carrito.service")

async function mostrarOrden(req,res) {
    const orden = await getOrden()
    res.send(orden)
}

async function guardarOrden(req,res){
    const user = req.user
    const userMAIL = user.email
    const carrito = await getCarrito()
    const productos = carrito.productos

    await postOrden(userMAIL, carrito._id, productos)
    res.send("orden guardada")
}

module.exports = {
    mostrarOrden,
    guardarOrden
}