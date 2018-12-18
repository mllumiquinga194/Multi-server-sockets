import Server from "./classes/server";
import router from "./routes/router";
import bodyParser from 'body-parser';
import cors from 'cors';

//ahora llamo asi a mi clase servidor una vez implementado el patron singleton, evitando que me cree otra instancia de mi server 
// const server = new Server();
const server = Server.instance;

//BODYPARSER
server.app.use( bodyParser.urlencoded({ extended: true }));
server.app.use( bodyParser.json() );

//CORS
server.app.use( cors({ origin: true, credentials: true }));

//RUTAS
server.app.use('/', router);

server.start( () => {

    console.log(`Servidor corriendo en el puerto ${ server.port }`);
});