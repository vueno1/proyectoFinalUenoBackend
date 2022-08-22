console.log("conexion desde el cliente index.js")

const socket = io.connect()
socket.on("mensaje", data =>{
    console.log(data)
})





