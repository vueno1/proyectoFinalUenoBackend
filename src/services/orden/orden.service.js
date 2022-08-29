const {miOrden} = require("../../daos/index")

async function getOrden(){
    return await miOrden.mostrarTodo()
}

async function postOrden(userMAIL,carritoId, productos){
    const objeto = {
        email: userMAIL,
        orden: carritoId,
        productos: productos
    }
    return await miOrden.guardar(objeto)
}

module.exports = {
    getOrden,
    postOrden
}