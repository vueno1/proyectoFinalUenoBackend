const { Router } = require('express');
const router = Router();
const {
    showMensajes,
    guardarMensajes,
    mensajesPorEmail
} = require("../controllers/mensajes/mensaje.controller")

router.post("/mensajes", guardarMensajes)
router.get("/mensajes/:email", mensajesPorEmail)
router.get("/mostrarMensajes", showMensajes)

module.exports = router