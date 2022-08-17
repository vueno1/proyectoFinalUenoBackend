const log4js = require("../../config/log");
const logger = log4js.getLogger("archivo")

const {
    getCarrito,
    guardarEnCarrito,
    carritoNuevoId,   
    getCarritoArray, 
    deleteCarritoById,
    deleteProductoInCarritoById

} = require("../../services/carrito/carrito.service")

async function mostrarCarrito(req,res){
    res.send({
        miCarrito: await getCarritoArray()
    })
}

async function guardarProductoEnCarrito(req,res) {
    try {
        const idProducto = req.params.id
        const hayCarrito = await getCarritoArray()      
        
        if(hayCarrito.length <=0) {
            const idCarrito = await carritoNuevoId()
            await guardarEnCarrito(idCarrito, idProducto)
        }else {
            const carrito = await getCarrito()
            await guardarEnCarrito(carrito._id, idProducto)
        }
        res.redirect("/index")  
    }
    catch (error) {
        logger.error(error)
    }
}

module.exports = {
    guardarProductoEnCarrito,
    mostrarCarrito
}