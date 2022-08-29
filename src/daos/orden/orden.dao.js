const ContenedorMongodb = require("../../contenedores/contenedor")
const Orden = require("../../models/o_model")

module.exports = class OrdenDaoMongoDB extends ContenedorMongodb {

    constructor() {
        super(Orden)
    }
    
}
