const bcrypt = require('bcrypt')
require("../../config/mongoose")
const twilioClient = require("../../config/twilio")
require("dotenv").config() 
const transporter = require("../../config/nodemailer")
const log4js = require("../../config/log")
const logger = log4js.getLogger()
const {mostrarTodosMensajes} = require("../../controllers/mensajes/mensaje.controller")
const {buscarTodosUser,buscarUserxId} = require("../../services/user/user.service")
const {getCarrito,getCarritoArray, deleteCarritoPorId} = require("../../services/carrito/carrito.service")
const {getProductos} = require("../../services/productos/producto.service")

async function getLogin(req, res) {
    try{
        res.render("login")
    }
    catch(error){
        logger.warn(`warning = ${error}`)
    }
}

async function getLoginError (req, res) {
    try{
        logger.warn("error al loggearse!")
        res.render("login_error")
    }
    catch(error){
        logger.warn(`warning = ${error}`)
    }
}

async function getRegister(req, res){
    try{
        res.render("register")
    }
    catch(error){
        logger.warn(`warning = ${error}`)
    }
}

async function postRegister (req,res){
    try{        
        const usuariosRegistrados = await buscarTodosUser()
        const { email,
                password,
                name,
                address, 
                age, 
                phone, 
                avatar
            } = await req.body
            
            if(usuariosRegistrados.find(usuario => usuario.email === email)){
                logger.warn("el usuario ya esta registrado!")
                res.render("register_error")
            }        
            const salt = await bcrypt.genSalt(10) //ejecuta el algoritmo 10 veces.
            const hash = await bcrypt.hash(password, salt)
            
            const user = new Usuario({
                email: email, 
                password: hash,
                name: name,
                address: address,
                age: age, 
                phone: phone,
                avatar: avatar
        })        
        await user.save()

        //--------------------------------------------------------
        const mailUsuarioNuevo = {
            from: "servidor",
            to: process.env.MAIL_ADMIN,
            subject: "nuevo Usuario Registrado",
            html: `datos del usuario: ${user}`
        }
        await transporter.sendMail(mailUsuarioNuevo)
        logger.info("informacion enviada por mail al administrador")    
        res.redirect("/")
    }
    catch(error){
        logger.warn(`warning = ${error}`)
    }
}

async function getIndex(req, res){
    try{  
        const mensajes = await mostrarTodosMensajes()
        console.log(mensajes)
        const productos = await getProductos()
        const user = await buscarUserxId({
            _id: req.user._id
        })        
        const carrito = await getCarritoArray()
        res.render("index", {
            nombre: user.name,
            avatar: user.avatar,
            productos: productos,
            carrito: carrito,
            mensajes: mensajes
        })
    }
    catch(error){
        logger.warn(`warning = ${error}`)
    }
}

async function getEnviarMensajes(req,res){
    try {
        const carrito = await getCarritoArray()
        const user = await buscarUserxId({
            _id: req.user._id
        })

        if(carrito.length >=1) {
            const mailPedidos = {
                from: "servidor",
                to: process.env.MAIL_ADMIN,
                subject: `pedido del usuario = ${user.email}`,
                html: `datos del pedido = ${carrito}`
            }
            await transporter.sendMail(mailPedidos)
            logger.info("pedido enviado por mail al administrador")

            twilioClient.messages
                .create({
                    body: `${user.email} realizo un pedido`,
                    from: process.env.TWILIO_WHATSAPP,
                    to: process.env.WHATSAPP
                })
                .then(message => logger.info(`whatsapp enviado = ${message.sid}`))
                .done()

            twilioClient.messages
                .create({
                    body: `Hemos recibido su pedido, la misma se encuentra en proceso`,
                    from: process.env.TWILIO_SMS,
                    to: `+${user.phone}`
                })
                .then(message=> logger.info(`sms enviado = ${message.sid}`))
                .done()
        }
        res.redirect("/index")
    } catch(e) {
        logger.warn(e)
    }
}

async function getLogout(req, res){
    try {
        logger.info("Adios y gracias por su compra!")
        req.session.destroy() 
        const carrito = await getCarrito()
        if(carrito) {
            await deleteCarritoPorId(carrito._id)     
        }
        res.redirect("/")        
    }
    catch(error){
        logger.warn(`warning = ${error}`)
    }
}

module.exports = {
    getLogin,
    getLoginError, 
    getRegister, 
    postRegister,
    getIndex,
    getEnviarMensajes,
    getLogout
}