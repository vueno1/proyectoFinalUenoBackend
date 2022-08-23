const socket = io.connect()

socket.on("mensajes", data =>{
    console.log("hola! desde el cliente!!!")
    console.log({
        misMensajes: data
    })
})





