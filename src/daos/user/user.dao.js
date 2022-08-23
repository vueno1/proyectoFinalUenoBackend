const ContenedorMongodb = require("../../contenedores/contenedor")
const Usuario = require("../../models/user")

module.exports = class UserDaoMongoDB extends ContenedorMongodb {

    constructor() {
        super(Usuario)
    }
    
}