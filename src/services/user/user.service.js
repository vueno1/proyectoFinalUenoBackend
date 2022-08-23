const {misUsuarios} = require("../../daos/index")

async function buscarTodosUser() {
    return await misUsuarios.mostrarTodo()
}

async function buscarUserxId(id){
    return await misUsuarios.buscarPorId(id)
}

async function createUser(u){
    return await misUsuarios.guardar(u)
}

module.exports = {buscarTodosUser, buscarUserxId, createUser}
