const app = require("./app")
const {Server:IOServer} = require("socket.io");
const {Server:HttpServer} = require("http")
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

// const contenedorMensajes = require("../contenedores/contenedor.memoria")
// const mensajesAPI = new contenedorMensajes()

// app.post ("/mensajes", async (req,res) =>{
//     const mensajes = await req.body
//     await mensajesAPI.guardar(mensajes)
//     console.log(mensajes)
//     res.redirect("/index")
// })

const {mostrarTodosMensajes} = require("../controllers/mensajes/mensaje.controller")

io.on("connection", async function(socket) {
    console.log("usuario conectado x socket")
    socket.emit("mensajeNuevo", await mostrarTodosMensajes())
})

module.exports = {httpServer, io}