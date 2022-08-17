const {miCarrito} = require("../../daos/index")

async function getCarrito(){
    return await miCarrito.mostrarCarrito()
}

async function getCarritoArray(){
    return await miCarrito.mostrarTodo()
}

async function carritoNuevoId(){
    return await miCarrito.crearCarrito()
}

async function guardarEnCarrito(idCarrito,idProducto) {
    const guardado = await miCarrito.guardarEnCarrito(idCarrito, idProducto)
    return guardado
}

module.exports = {
    getCarrito,
    carritoNuevoId,
    guardarEnCarrito,
    getCarritoArray
}