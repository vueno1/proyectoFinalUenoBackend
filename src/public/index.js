const socket = io.connect()
console.log("hola! desde el cliente 👋👋👋!!!")

const formularioMensajes = document.getElementById("formularioMensajes")
const muestraDeMensajes = document.getElementById("indexChat")

formularioMensajes.addEventListener("submit", e =>{
    e.preventDefault()
    const mensajeIngreso = {
       email: formularioMensajes.email.value,
       mensaje: formularioMensajes.mensaje.value
    }
    socket.emit("mensajeIngreso", mensajeIngreso)
    formularioMensajes.reset()
})

socket.on("todosMensajes", async (data) =>{
    const response = await fetch("views/partials/chat.respuestas.hbs")
    let template = response.text()
    const string = await template
    const plantilla = Handlebars.compile(string)
    const html = plantilla({data})
    muestraDeMensajes.innerHTML = html
})





