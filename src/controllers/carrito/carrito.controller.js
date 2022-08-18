const log4js = require("../../config/log");
const logger = log4js.getLogger("archivo")

const {
    getCarrito,
    guardarEnCarrito,
    carritoNuevoId,   
    getCarritoArray, 
    deleteCarritoPorId,
    deleteProductoxCarrito

} = require("../../services/carrito/carrito.service")

async function mostrarCarrito(req,res){
    try{
        res.send({
            miCarrito: await getCarritoArray()
        })
    } catch(e) {
        logger.error(e.message);
    }
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
    catch (e) {
        logger.error(e.message)
    }
}

async function borrarCarrito(req,res) {
    try{
        const idCarrito = req.params.id
        await deleteCarritoPorId(idCarrito)
        res.send(`carrito eliminado`)

    } catch(e) {
        logger.error(e.message)
    }
}

async function borrarProducto (req,res){
    try{
        const idProducto = req.params.id_prod
        const idCarrito = req.params.id
        const carritoActualizado = await deleteProductoxCarrito(idProducto, idCarrito)
        res.send(carritoActualizado)   
    }
    catch (e) {
        logger.error(e.message)
    }
}

module.exports = {
    guardarProductoEnCarrito,
    mostrarCarrito,
    borrarCarrito,
    borrarProducto
}