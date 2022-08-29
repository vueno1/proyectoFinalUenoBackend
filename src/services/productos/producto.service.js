const {misProductos} = require("../../daos/index")

async function getProductos(){
    return await misProductos.mostrarTodo()
}

async function getProductosById(id){
    const productos = await misProductos.mostrarTodo()
    const existe = await productos.find(p=>p._id==id)
    if(!existe) return "producto no existe!"
    return await misProductos.buscarPorId(id)
}

async function postProducto(p) {
    const productos = await misProductos.mostrarTodo()
    const existe = await productos.find(producto=>producto.nombre===p.nombre)
    if(existe) return "el producto ya fue ingresado!"
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
    getProductosById,
    postProducto,
    putProducto,
    deleteProducto
}