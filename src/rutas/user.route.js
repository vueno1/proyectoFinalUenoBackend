const express = require('express')
const router = express.Router()
const passport = require("../config/passport")

const {
    getLogin, 
    getLoginError, 
    getRegister, 
    postRegister,
    getIndex,
    getEnviarMensajes,
    getLogout

} = require("../controllers/user/user.controller")

router.get("/", getLogin)
router.post('/', 
    passport.authenticate("local", {
        successRedirect: "/index",
        failureRedirect: "/login_error"
    })
)
router.get("/login_error", getLoginError)
router.get("/register", getRegister)
router.post("/register", postRegister)
router.get("/index", getIndex)
router.get("/enviarMensajes" , getEnviarMensajes)
router.get("/logout", getLogout) 

module.exports = router; 