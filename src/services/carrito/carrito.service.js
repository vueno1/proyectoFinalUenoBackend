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

async function postEnCarrito(idCarrito,idProducto,direccion) {
    const carrito = await miCarrito.mostrarCarrito() 
    const productosEnCarrito = carrito.productos 
    const productos = await misProductos.mostrarTodo() 
    const productoElegido = await productos.find(producto=>producto.id===idProducto) 
    const existeNombre = await productosEnCarrito.find(e => e.nombre === productoElegido.nombre)

    if(productosEnCarrito.length <= 0){
        const productoNuevo = {
            nombre: productoElegido.nombre,
            foto: productoElegido.foto, 
            precio: productoElegido.precio, 
            cantidad: 1, 
            _id: productoElegido._id        
        }
        return await miCarrito.guardarEnCarrito(idCarrito, productoNuevo, direccion)

    } else if (!existeNombre){
        const productoNuevo = {
            nombre: productoElegido.nombre,
            foto: productoElegido.foto, 
            precio: productoElegido.precio, 
            cantidad: 1, 
            _id: productoElegido._id        
        }
        return await miCarrito.guardarEnCarrito(idCarrito, productoNuevo, direccion)
        
    } else {
       const productosFiltrados = productosEnCarrito.filter(e =>e.nombre !== productoElegido.nombre)
       const objetoAnterior = productosEnCarrito.find(e=>e.nombre === productoElegido.nombre)
        const nuevoProducto = {
            nombre: objetoAnterior.nombre,
            foto: objetoAnterior.foto,
            precio: objetoAnterior.precio,
            cantidad: objetoAnterior.cantidad+1,
            _id: objetoAnterior._id
        }
        productosFiltrados.push(nuevoProducto)
        const carritoNuevo = {
            _id: carrito._id,
            productos: productosFiltrados,
            direccionEntrega: direccion,
            timestamp: carrito.timestamp
        }
        return await miCarrito.updateCarrito(idCarrito, carritoNuevo)
    }     
}

async function deleteCarritoPorId(idCarrito){
    return await miCarrito.borrarCarritoPorId(idCarrito)
} 

async function deleteProductoxCarrito(idProducto, idCarrito){
    const mostrarCarrito = await miCarrito.mostrarCarrito()
    const productos = await misProductos.mostrarTodo()
    const productoElegido = await productos.find(producto=>producto.id===idProducto) 
    const productosEnCarrito = mostrarCarrito.productos
    const productoAEliminar = productosEnCarrito.find(e => e.nombre === productoElegido.nombre)
    if(productoAEliminar.cantidad === 1){
        const productosFiltrados = productosEnCarrito.filter(e =>e.nombre !== productoElegido.nombre)
         const carritoNuevo = {
             _id: mostrarCarrito._id,
             productos: productosFiltrados,
             timestamp: mostrarCarrito.timestamp
         }
        return await miCarrito.updateCarrito(idCarrito, carritoNuevo)
    }
    const productosFiltrados = productosEnCarrito.filter(e =>e.nombre !== productoElegido.nombre)
    const objetoAnterior = productosEnCarrito.find(e=>e.nombre === productoElegido.nombre)
     const nuevoProducto = {
         nombre: objetoAnterior.nombre,
         foto: objetoAnterior.foto,
         precio: objetoAnterior.precio,
         cantidad: objetoAnterior.cantidad-1,
         _id: objetoAnterior._id
     }
     productosFiltrados.push(nuevoProducto)
     const carritoNuevo = {
         _id: mostrarCarrito._id, 
         productos: productosFiltrados,
         timestamp: mostrarCarrito.timestamp
     }
    return await miCarrito.updateCarrito(idCarrito, carritoNuevo)
}

module.exports = {
    getCarrito,
    carritoNuevoId,
    postEnCarrito,
    getCarritoArray,
    deleteCarritoPorId,
    deleteProductoxCarrito
}