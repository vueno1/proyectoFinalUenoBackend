const log4js = require("../../config/log")
const logger = log4js.getLogger()

const {
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

module.exports = {
    guardarMensajes
}