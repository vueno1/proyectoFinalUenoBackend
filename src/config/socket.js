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

    socket.emit("todosMensajes", await getTodosMensajes())

    socket.on("mensajeIngreso", async function (data){
        await postMensaje(data)
        io.sockets.emit("todosMensajes", await getTodosMensajes())
    })    
})

module.exports = {httpServer, io}