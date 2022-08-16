const { Router } = require('express');
const router = Router();
const {
    mostrarTodo,
    guardarProducto,
    updateProducto,
    eliminarProducto
} = require("../controllers/productos/producto.controller")


router.get("/", mostrarTodo)
router.post('/', guardarProducto)
router.put("/:id", updateProducto)
router.delete("/:id", eliminarProducto)

module.exports = router;