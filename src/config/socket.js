const express = require("express");
const {Server:IOServer} = require("socket.io");
const {Server:HttpServer} = require("http")

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static("./public"))

module.exports = {io}