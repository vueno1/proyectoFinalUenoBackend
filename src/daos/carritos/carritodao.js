const ContenedorMongodb = require("../../contenedores/contenedor")
const Carrito = require("../../models/c_model")
const Producto = require("../../models/p_model")

module.exports = class CarritosDaoMongoDB extends ContenedorMongodb {

    constructor() {
        super(Carrito)
    }

    async mostrarCarrito () {
        try {
            const carrito = await Carrito.findOne()     
            return await carrito            
        }
        catch(e) {
            console.log(e)
        }
    }

    async crearCarrito() {
        try {           
            const carritoNuevo = {
                productos: [],
                timestamp: Date.now()
            }
            const carritoSaveModel = new Carrito(carritoNuevo)
            let carritoSave = await carritoSaveModel.save()
            return await carritoSave._id
        }
        catch(error) {
            console.log(error.message)
        }
    }

    async updateCarrito(idCarrito, reemplazo) {
        try{
            await Carrito.findByIdAndUpdate(idCarrito, {$set: reemplazo})
        }catch(e){
            console.log(e)
        }
    }

    async guardarEnCarrito(carritoId,producto) {
        try{
            await Carrito.findByIdAndUpdate(carritoId , {$push: {"productos": producto}}) 
            return await Carrito.find()           
        }
        catch(error) {
            console.log(error.message)
        }
    }

    async buscarCarritoPorId (id) {
        try{
            return await Carrito.findOne({_id:id})
        }
        catch(error){
            console.log(error.message)
        }
    }

    async borrarCarritoPorId (id) {
        try{
            await Carrito.findByIdAndDelete({_id: id})
            return await Carrito.find()
        }
        catch(error){
            console.log(error.message)
        }
    }

    async borrarProductoDeCarrito(idProducto, idCarrito) {
        try{
            const productoElegido = await Producto.findOne({_id:idProducto})
            await Carrito.findByIdAndUpdate(idCarrito, {$pull: {"productos": productoElegido}})
            return Carrito.find()                      
        }
        catch(error){
            console.log(error.message)
        }
    }
}