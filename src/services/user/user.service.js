const Usuario = require('../../models/user')

async function buscarTodosUser() {
    return await Usuario.find()
}

async function buscarUserxId(id){
    return await Usuario.findById(id)
}

module.exports = {buscarTodosUser, buscarUserxId}
