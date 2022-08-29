require("dotenv").config() 
const PORT = process.env.PORT || 3000
const cluster = process.env.CLUSTER
const [, , argumento] = process.argv
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
            logger.info(`worker 👷👷👷 = ${worker.process.pid}`)
        })
    } else {
        const {httpServer} = require("./src/config/socket")
         
        httpServer.listen(PORT, ()=>{
            logger.debug(`📢 Escuchando en el puerto [***CLUSTER***] = ${PORT}`)
        })
        httpServer.on("error", error => logger.error(`Error en servidor ${error}`))
    }
} else {
   const {httpServer} = require("./src/config/socket")     
    httpServer.listen(PORT, ()=>{
        logger.info(`📢 Escuchando en el puerto [***FORK***] = ${PORT}`)
    })
    httpServer.on("error", error => logger.error(`Error en servidor ${error}`))
}
