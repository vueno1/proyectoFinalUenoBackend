const log4js = require("../../config/log")
const logger = log4js.getLogger()

const {
    getTodosMensajes,
    postMensaje
} = require("../../services/mensajes/mensaje.service")


async function guardarMensajes(req,res){
    try {
        const mensaje = await req.body
        await postMensaje(mensaje)
        res.redirect("/index")
    }catch(e){
        logger.error(e.message)
    }
}

async function showMensajes(req,res) {
    try{
        const mensajes = await getTodosMensajes()
        res.send({
            mensajes: mensajes
        })
    }catch(e) {
        logger.error(e.message)
    }
}

module.exports = {
    guardarMensajes,
    showMensajes
}