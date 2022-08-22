const contenedorMemoria = require("../../contenedores/contenedor.memoria")
const misMensajes = new contenedorMemoria()

async function getTodosMensajes(){
    const guardado = await misMensajes.listarAll()
    console.log(`service: ${guardado}`)
    return guardado
}

async function postMensaje(m) {
    return await misMensajes.guardar(m)
}

module.exports = {
    getTodosMensajes,
    postMensaje
}