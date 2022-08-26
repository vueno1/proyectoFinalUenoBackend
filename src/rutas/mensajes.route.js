const { Router } = require('express');
const router = Router();
const {
    showMensajes,
    guardarMensajes
} = require("../controllers/mensajes/mensaje.controller")

router.post("/mensajes", guardarMensajes)
router.get("/mostrarMensajes", showMensajes)

module.exports = router