const socket = io.connect()
socket.on("mensajeNuevo", data =>{
    console.log("conexion desde el cliente index.js")
    console.log(data)
})





