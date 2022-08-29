const { Router } = require('express');
const router = Router();
const {
    mostrarTodo,
    mostrarPorId,
    guardarProducto,
    updateProducto,
    eliminarProducto
} = require("../controllers/productos/producto.controller")


router.get("/", mostrarTodo)
router.get("/:id", mostrarPorId)
router.post('/', guardarProducto)
router.put("/:id", updateProducto)
router.delete("/:id", eliminarProducto)

module.exports = router;