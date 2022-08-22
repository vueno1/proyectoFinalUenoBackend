const log4js = require("../../config/log")
const logger = log4js.getLogger()

const {
    getTodosMensajes,
    postMensaje
} = require("../../services/mensajes/mensaje.service")

async function mostrarTodosMensajes(req,res){
    try {
        const mensajes = await getTodosMensajes()

        res.send({
            mensajes: await getTodosMensajes()
        }) 

    }catch(e){
        logger.error(e.message)
    }
}

async function guardarMensajes(req,res){
    try {
        const mensaje = await req.body
        await postMensaje(mensaje)
        res.send({
            mensajeAgregado: mensaje
        })
    }catch(e){
        logger.error(e.message)
    }
}

module.exports = {
    mostrarTodosMensajes,
    guardarMensajes
}