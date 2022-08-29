const app = require("./app")
const {Server:IOServer} = require("socket.io");
const {Server:HttpServer} = require("http")
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const log4js=require("./log")
const logger = log4js.getLogger()

const {getTodosMensajes, postMensaje} = require("../services/mensajes/mensaje.service")

io.on("connection", async function(socket) {
    logger.info("***HELLO!👋👋👋 NUEVO USUARIO!***")
    const mensajes = await getTodosMensajes()

    socket.emit("mensajes", await mensajes)

    socket.on("mensajeIngreso", data =>{
        postMensaje(data)
        io.sockets.emit("todosMensajes", mensajes)
    })    
})

module.exports = {httpServer, io}