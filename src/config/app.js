const express = require ('express');
const app = express()
const productosRoutes = require("../rutas/productos.route") 
const carritoRoute = require("../rutas/carrito.route") 
const usuarioRoute = require("../rutas/user.route")
const mensajeRoute = require("../rutas/mensajes.route")
const path = require("path")
const exphbs = require("express-handlebars")
const passport = require("../config/passport")
const MongoStore = require("./mongoconexion")
require("../config/mongoose")
require("../config/config")
const cookieParser = require("cookie-parser")
const session = require('express-session')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

app.use(express.json());
app.use(express.urlencoded({ extended:true }))
app.use(express.static(path.join(path.dirname(''), './src/public'))) //conecta index.js

app.use(cookieParser())
app.use(session({
    store: MongoStore,
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: {
    //     expires: 300000 //5min de inactividad
    // }
}))

app.use(passport.initialize())
app.use(passport.session()) 

app.set('views', path.join(path.dirname(''), './src/public/views')) //conecta views

app.engine('.hbs', exphbs.engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars), 
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use('/api/productos', productosRoutes);
app.use('/api/carrito', carritoRoute);
app.use("/", usuarioRoute)
app.use("/", mensajeRoute)

module.exports = app; 