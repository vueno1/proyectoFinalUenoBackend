const {misProductos} = require("../../daos/index")

async function getProductos(){
    return await misProductos.mostrarTodo()
}

async function postProducto(p) {
    return await misProductos.guardar(p)
}

async function putProducto(id, p) {
    return await misProductos.actualizarPorId(id, p)
}

async function deleteProducto(id) {
    return await misProductos.borrarPorId(id)
}

module.exports = {
    getProductos,
    postProducto,
    putProducto,
    deleteProducto
}