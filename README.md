# Proyecto Final 
## Clase Backend 2022 - Comision 20645

### Comercio Online - :corn: Venta de Frutas y Verduras.:watermelon:
- - -

Comercio Onlines es una app que funciona como un e-commerce. 
En ella podemos iniciar sesion, ver listado de productos, seleccionarlos y avisar al proveedor de la compra. 

#### Descripcion de la App: 
* Iniciamos sesion o nos registramos al abrir el navegador. 
* Al registrarnos, enviamos la informacion al proveedor con los detalles del usuario nuevo. 
* Una vez loggeado, nos conducira al index de la pagina, donde podremos ver el listado de productos a la venta y mas abajo las consultas del cliente y respuestas del proveedor. 
* Podemos seleccionar el producto e ingresarlo a nuestro carrito, la cual se encuentra debajo del listado. 
* En carrito nos informa: id del carrito y detalle del producto ingresado. 
* Una vez hechas las selecciones pertinentes, finalizamos la compra. 
* Al finalizar la compra, se envia un mail al proveedor con los detalles de la compra, se genera una orden, y se envia un whatsapp y sms avisando del proceso de compra. 
* Al hacer logout, finalizamos la sesion y el carrito se elimina tambien.

#### Tecnologias utilizadas: 
* Node.js con framework Express
* Base de datos: Mongodb con ORM Mongoose & Connect-Mongo + Mongo-ATLAS
* Vista: Express-handlebars
* autenticacion: Passport __no use JWT (avisado al profesor)__
* Chat en tiempo real: Websocket con Socket.io (mensajes se guardan en MongoDB)
* Email: Nodemailer
* Mensajes texto: Twilio 
* Sesion: Express-Session 
* Cookies: Cookie-parser
* Loggs: Log4js

#### Implementacion Rutas: 
* ##### Usuario: 
    Ingreso y registro de usuario desde __Vistas Handlebars__: 
    - __POST__: http://localhost:8080/ → "passport" autentica los datos, y si existen mail y contraseña, dan acceso al index.
    - __GET__: http://localhost:8080/login_error → vista para error de loggeo. 
    - __POST__: http://localhost:8080/register → para el posteo de registro 
    - __GET__: http://localhost:8080/index → se envian todos los datos a la vista index.hbs para renderizarlos en sus respectivos partials. 
    - __GET__: http://localhost:8080/enviarMensajes → al finalizar la compra, se envian todos los datos por esta ruta al clicker boton "finalizarCompra". 
    Se envian los mails, los mensajes de texto, y se elimina el carrito. 
    __se utilizan service de "carrito, productos y user"__
    - __GET__: http://localhost:8080/logout → se destruye la sesion y se vuelve a login.hbs

* ##### Productos: 
    Muestro, ingreso, modifico y elimino con __"Postman"__. 
    Rutas: 
    - __GET__: http://localhost:8080/api/productos
    - __GET__: http://localhost:8080/api/productos/630afb2d09348a586e53d604
    - __POST__: http://localhost:8080/api/productos
    - __PUT__: http://localhost:8080/api/productos/62fc0daf755a14dbac449005
    - __DELETE__: http://localhost:8080/api/productos/630afa5309348a586e53d5e3

    ***Vistas → muestro mis productos al renderizarlos en /index.hbs

* ##### Carrito: 
    Creo, ingreso y elimino carrito con los "botones" en las __Vistas handlebars__.
    - Creo "carrito" al hacer click en 1 primer producto en vista "productos.hbs"
    - __POST__: "api/carrito/{{this._id}} → se hace un post del producto seleccionado, y se envia al controlador para que lo ingrese al carrito creado. 
    - __GET__: http://localhost:8080/api/carrito → muestro todo mi carrito. 
    La misma voy renderizando en vista "index.hbs" donde se aloja "carrito.hbs".
    - __DELETE__: /api/carrito/deleteProducto/{{this._id}} → en el boton "eliminar" de la vista "carrito" podemos eliminar producto seleccionado x id, y eliminamos por unidad. 
    - El carrito se elimina una vez que se hace logout: 
     - __GET__: "/logout" → se cierra sesion, y se elimina tambien carrito. 

* ##### Mensajes: 
    Los mensajes se crean y se postean en la __Vista handlebars__. 
    - __POST__: http://localhost:8080/mensajes → posteamos los mensajes ingresados en el input de "chat.hbs".
    - __GET__: http://localhost:8080/mostrarMensajes → mostramos los mensajes y los renderizamos en "index.hbs" donde se encuentra el partial "chat.respuestas.hbs".
    - __GET__:http://localhost:8080/mensajes/:email → aqui podemos ver los mensajes por email. __esta ruta no la implemente, solo la puedo usar en postman__

#### Clonar y usar: 
```
git clone https://github.com/vueno1/proyectoFinalUenoBackend.git
npm install 
npm start
```

#### Autora: 
Ueno Valeria Soledad 
[Email](ueno.vale@gmail.com)
[LinkedIn](https://www.linkedin.com/in/valeria-ueno-996a61210/)



