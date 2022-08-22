const { Router } = require('express');
const router = Router();
const {io} = require("../config/socket");
const contenedorMensajes = require("../contenedores/contenedor.memoria")
const mensajesAPI = new contenedorMensajes()

router.get("/", async (req,res) =>{
    const mostrarMensajes = await mensajesAPI.listarAll()
    res.redirect("/index")
})

router.post("/mensajes", async(req,res) =>{
    
})