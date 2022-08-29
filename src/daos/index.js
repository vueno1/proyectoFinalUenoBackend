const ProductosDaoMongoDB = require("./productos/productodao.js")
const CarritosDaoMongoDB = require("./carritos/carritodao")
const MensajesDaoMongoDB = require("./mensajes/mensaje.dao")
const UserDaoMongoDB = require("./user/user.dao")
const OrdenDaoMongoDB = require("./orden/orden.dao")

const misProductos = new ProductosDaoMongoDB()
const miCarrito = new CarritosDaoMongoDB()
const misMensajes = new MensajesDaoMongoDB()
const misUsuarios = new UserDaoMongoDB()
const miOrden = new OrdenDaoMongoDB()

module.exports = { miCarrito, misProductos, misMensajes , misUsuarios, miOrden}
