const log4js = require("../../config/log")
const logger = log4js.getLogger()

const {
    getProductos,
    postProducto,
    putProducto,
    deleteProducto
} = require("../../services/productos/producto.service")

async function mostrarTodo(req,res) {
    const productos = await getProductos()
    res.render("index", {
        productos:productos
    })
}

async function guardarProducto(req,res){
    try {
        const producto = await req.body
        await postProducto(producto)
        res.send({
            agregado: producto
        })
    } catch(e) {
        logger.error(e)
    }
}

async function updateProducto(req,res){
    try{
        const id = req.params.id
        const objetoReemplazo = req.body
        const actualizacion = await putProducto(id,objetoReemplazo)
    
        if(actualizacion === - 1) {
            res.send("el id no existe!")
        }
        res.send(actualizacion)
    }  catch (e) {
        logger.error(e)
    }
}

async function eliminarProducto(req,res) {
    try{
        const id = req.params.id
        const eliminacion = await deleteProducto(id)
        if(!eliminacion) {
            res.send("el id no existe!")
        }
        res.send(`el producto id ${id} se ha eliminado`)
    } catch(e) {
        logger.error(e)
    }
}

module.exports = {
    mostrarTodo,
    guardarProducto,
    updateProducto,
    eliminarProducto
}