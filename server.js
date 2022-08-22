require("dotenv").config() 
const PORT = process.env.PORT || 3000
const cluster = process.env.CLUSTER
const [, , argumento] = process.argv

const { io } = require("socket.io-client")
const log4js = require("./src/config/log")
const logger = log4js.getLogger()

if(argumento === cluster) {
    const cluster = require("cluster")
    const numCPUs = require("os").cpus().length

    if(cluster.isMaster) {
        for(let i=0; i<numCPUs; i++) {
            cluster.fork()
        }

        cluster.on("listening", (worker,address)=>{
            logger.info(`worker = ${worker.process.pid}`)
        })
    } else {
        const server = require("./src/config/app")    
        server.listen(PORT, ()=>{
            logger.debug(` escuchando el puerto [***CLUSTER***] = ${PORT}`)
        })
        server.on("error", error => console.log(`Error en servidor ${error}`))
    }

} else {
    const {httpServer} = require("./src/config/socket")

    // const {Server: HttpServer} = require("http")
    // const {Server: IOServer} = require("socket.io")
    // const httpServer = new HttpServer(server)
    // const io = new IOServer(httpServer)
    // console.log(io)

    // const messages = [
    //     {autor: "JUAN", text: "hola!!!"},
    //     {autor: "MARIA", text: "como estas!!!"}
    // ]

    // io.on("connection", function(socket){
    //     console.log('un cliente se ha conectado')
    //     socket.emit("mensaje", messages)
    // })
    
    httpServer.listen(PORT, ()=>{
        console.log(`escuchando el puerto [***FORK***] =  ${PORT}`)
    })
    httpServer.on("error", error => console.log(`Error en servidor ${error}`))

}
