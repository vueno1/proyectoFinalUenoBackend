const ContenedorMongodb = require("../../contenedores/contenedor")
const Mensaje = require("../../models/m_model")

module.exports = class MensajeMongodb extends ContenedorMongodb {

    constructor() {
        super(Mensaje)
    }

    async buscarPorEmail(email){
        try {
            const buscar = await this.collection.findOne({email:email})
            return buscar
        } catch(e) {
            console.log(e.message)
        }
    }
    
}