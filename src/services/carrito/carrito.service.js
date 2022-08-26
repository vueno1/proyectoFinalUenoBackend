const {miCarrito, misProductos} = require("../../daos/index")

async function getCarrito(){
    return await miCarrito.mostrarCarrito()
}

async function getCarritoArray(){
    return await miCarrito.mostrarTodo()
}

async function carritoNuevoId(){
    return await miCarrito.crearCarrito()
}

async function postEnCarrito(idCarrito,idProducto) {
    const carrito = await miCarrito.mostrarCarrito() //todo el carrito 
    const productosEnCarrito = carrito.productos //los productos que estan en carrito al momento
    const productos = await misProductos.mostrarTodo() //muestro mis productos
    const productoElegido = await productos.find(producto=>producto.id===idProducto) //el producto elegido    
    const existeNombre = await productosEnCarrito.find(e => e.nombre === productoElegido.nombre)

    if(productosEnCarrito.length <= 0){
        const productoNuevo = {
            nombre: productoElegido.nombre,
            foto: productoElegido.foto, 
            precio: productoElegido.precio, 
            cantidad: 1, 
            _id: productoElegido._id        
        }
        return await miCarrito.guardarEnCarrito(idCarrito, productoNuevo)
    } else if (!existeNombre){
        const productoNuevo = {
            nombre: productoElegido.nombre,
            foto: productoElegido.foto, 
            precio: productoElegido.precio, 
            cantidad: 1, 
            _id: productoElegido._id        
        }
        return await miCarrito.guardarEnCarrito(idCarrito, productoNuevo)
    } else {

        await miCarrito.updateProductoEnCarrito(idCarrito, idProducto)
        // const buscar = await productosEnCarrito.find(objeto =>{
        //     return objeto.nombre === productoElegido.nombre
        // })

        // buscar.cantidad = (buscar.cantidad)+1
        // await miCarrito.updateProductoEnCarrito(idCarrito, buscar)

        return await miCarrito.mostrarTodo()
    }     
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
    postEnCarrito,
    getCarritoArray,
    deleteCarritoPorId,
    deleteProductoxCarrito
}