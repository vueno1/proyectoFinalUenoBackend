const { miCarrito } = require("../daos/index")
const { Router } = require('express');
const router = Router();

const {
    mostrarCarrito,
    guardarProductoEnCarrito
} = require("../controllers/carrito/carrito.controller")

const log4js = require("../config/log")
const logger = log4js.getLogger("archivo")

router.get("/", mostrarCarrito)

router.post("/:id", guardarProductoEnCarrito)

router.delete("/:id", async (req,res) =>{
    try{
        const id = req.params.id
        const carritoFiltrado = await miCarrito.borrarCarritoPorId(id)
        res.send(carritoFiltrado)

    }catch (e) {
        logger.error(e)
    }
})

router.delete("/:id/productos/:id_prod", async (req,res)=>{
    try{
        const idProducto = req.params.id_prod
        const idCarrito = req.params.id
        const carritoActualizado = await miCarrito.borrarProductoDeCarrito(idProducto, idCarrito)
        res.send(carritoActualizado)   

    }
    catch (e) {
        logger.error(e)
    }
})

module.exports = router