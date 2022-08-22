const { Router } = require('express');
const router = Router();
const {
    guardarMensajes
} = require("../controllers/mensajes/mensaje.controller")

router.post("/mensajes", guardarMensajes)

module.exports = router