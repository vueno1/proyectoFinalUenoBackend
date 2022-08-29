const {misMensajes} = require("../../daos/index")

async function getTodosMensajes(){
    const guardado = misMensajes.mostrarTodo()
    return guardado
}

async function getMensaje(email){
    const mensajes = misMensajes.buscarPorEmail(email)
    return mensajes
}

async function postMensaje(m) {
    return await misMensajes.guardar(m)
}

module.exports = {
    getTodosMensajes,
    getMensaje,
    postMensaje
}