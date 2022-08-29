const app = require("./app")
const {Server:IOServer} = require("socket.io");
const {Server:HttpServer} = require("http")
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const {getTodosMensajes} = require("../services/mensajes/mensaje.service")

io.on("connection", async function(socket) {
    console.log("***HELLO!👋👋👋 NUEVO USUARIO!***")

    const mensajes = await getTodosMensajes()
    io.sockets.emit("mensajes", mensajes)
})

module.exports = {httpServer, io}