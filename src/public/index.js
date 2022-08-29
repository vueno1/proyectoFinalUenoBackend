const socket = io.connect()

socket.on("mensajes", data =>{
    console.log("hola! desde el cliente 👋👋👋!!!")
})

// function render(data){
//     const html = data.map((elem, index) =>{
//         return (
//             `<div>
//                 <strong>${elem.email}</strong>:
//                 <em>${elem.mensaje}</em>
//             </div>`
//         )
//     }).join(" ");
//     document.getElementById("messages").innerHTML = html
// }

// function addMessage(e){
//     const mensaje = {
//         email:  document.getElementById("exampleFormControlInput1").value, 
//         mensaje: document.getElementById("exampleFormControlTextarea1").value  
//     }
//     socket.emit("new-message", mensaje)
//     return false
// }

// socket.on("messages", function(data){render(data)})

const formularioMensajes = document.getElementById("formularioMensajes")
const muestraDeMensajes = document.getElementById("messages")

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
   const response = await fetch("views/partials/otroChat.hbs")
   let template = response.text()
   const string = await template
   const plantilla = Handlebars.compile(string)
   console.log(data)
   plantilla({data})

//    muestraDeMensajes.innerHTML = html
})





