const { Router } = require('express');
const router = Router();

const {
    mostrarCarrito,
    guardarProductoEnCarrito,
    borrarCarrito,
    borrarProducto
} = require("../controllers/carrito/carrito.controller")

router.get("/", mostrarCarrito)
router.post("/:id", guardarProductoEnCarrito)
router.delete("/:id", borrarCarrito)
router.delete("/:id/productos/:id_prod", borrarProducto)

module.exports = router