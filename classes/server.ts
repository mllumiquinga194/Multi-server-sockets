import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';
import http from 'http';

//Todas las exportaciones que se encuentren en este archivo van a ser accedidas a ellas mediante socketconfig
import * as socketConfig from '../sockets/socket';

// a esta clase se le implemento el patron singleton asegunrando de tener una unica instancia del servidor de sockets asi como todas las demas propiedaddes de mi clase server!

export default class Server {

    // este instance es del mismo tipo de la clase server, es una propiedad estatica lo que significa que la puedo llamar de la server.instance por ejemplo
    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;//esta propiedad debe inicializarse porque sino marca como error

    //en teoria este va a ser el servidor que vamos a levantar y no el this.app.listen(this.port, callback); que esta en cla funcion start
    private httpServer: http.Server;

    // private constructor() { lo coloco asi para implementar el patron singleton

    private constructor() {

        this.app = express();
        this.port = SERVER_PORT;

        //socket.io necesita recibir la configuracion del servidor que esta corriendo en ese momento. en teoria deberia ser public app: express.Application; pero socket y express no son compatibles directamente por eso hay que usar un intermediario que sera HTTP
        this.httpServer = new http.Server(this.app);

        this.io = socketIO(this.httpServer);

        this.escucharSockets();

    }

    // como necesito usar mi clase server en distintos lugares, es posible que al instanciarla me cree otros instancias del io y me haria otra conecion de socket por eso vamos a implementar el patron singleton para asegurarme de que solo exista una unica instancia de mi clase server!!!
    public static get instance() {

        //en pocas palabras lo que se dice es: si ya existe una instancia, que laretorne, sino existe o es la primera vez qeu se llama a esa funcion el this._instance = new this(), o sea, crea una instancia y esto sera lo que va a regresar.
        return this._instance || (this._instance = new this());
    }

    private escucharSockets() {

        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', cliente => {

            //YA YO SÉ QUE AQUI SE CONECTA UN CLIENTE
            //cuando se conecta, automaticamente se le asigna un id
            // console.log( cliente.id );

            //ESCUCHAR MARCADORES NUEVOS
            socketConfig.marcadorNuevo(cliente);

            //ESCUCHAR MARCADORES A BORRAR
            socketConfig.borrarMarcador(cliente);

            //ESCUCHAR MARCADORES MOVER
            socketConfig.moverMarcador(cliente);


            //CONECTAR CLIENTE
            socketConfig.conectarCliente(cliente);

            //CONFIGURAR USUARIO
            socketConfig.loginWs(cliente, this.io);

            //OBTENER USUARIOS ACTIVOS
            socketConfig.obtenerUsuarios(cliente, this.io);

            //MENSAJES
            socketConfig.mensaje(cliente, this.io);

            //DESCONECTAR
            socketConfig.desconectar(cliente, this.io);


        });
    }

    start(callback: Function) {

        this.httpServer.listen(this.port, callback);

    }
}