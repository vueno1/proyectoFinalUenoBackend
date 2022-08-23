const {misMensajes} = require("../../daos/index")

async function getTodosMensajes(){
    const guardado = misMensajes.mostrarTodo()
    return guardado
}

async function postMensaje(m) {
    return await misMensajes.guardar(m)
}

module.exports = {
    getTodosMensajes,
    postMensaje
}