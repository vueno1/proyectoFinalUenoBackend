const ContenedorMongodb = require("../../contenedores/contenedor")
const Mensaje = require("../../models/m_model")

module.exports = class MensajeMongodb extends ContenedorMongodb {

    constructor() {
        super(Mensaje)
    }
    
}