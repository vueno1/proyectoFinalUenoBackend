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

async function deleteCarritoPorId(idCarrito){
    return await miCarrito.borrarCarritoPorId(idCarrito)
} 

async function deleteProductoxCarrito(idProducto, idCarrito){
    const carrito = await miCarrito.borrarProductoDeCarrito(idProducto,idCarrito)
    return carrito
}

module.exports = {
    getCarrito,
    carritoNuevoId,
    guardarEnCarrito,
    getCarritoArray,
    deleteCarritoPorId,
    deleteProductoxCarrito
}