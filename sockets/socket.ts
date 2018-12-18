import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';
import { Marcador } from '../classes/marcador';
import { mapa } from '../controllers/mapas';

//USUARIOS CONECTADOS
//aqui tengo una instancia de la lista de usuarios, aqui tengo acceso a todas las funciones de la lista
export const usauriosConectados = new UsuariosLista();


//MAPAS***************************************

export const marcadorNuevo = (cliente: Socket) => {

    //Escucho que hay un marcador nuevo
    cliente.on('marcador-nuevo', (marcador: Marcador) => {

        //en mi instancia de mapa, agrego ese marcador
        mapa.agregarMarcador(marcador);

        //y emito para que el resto de usuarios conectados puedan tener los marcadores que agrego. OJO la persona que emitio el marcador tambien escucharia que hay un marcadr nuevo, aunque el mismo lo haya emitido
        // io.emit('marcador-nuevo', marcador);
        cliente.broadcast.emit('marcador-nuevo', marcador);
    });
};

export const borrarMarcador = (cliente: Socket) => {

    cliente.on('borrar-marcador', (id: string) => {

        mapa.borrarMarcador(id);

        cliente.broadcast.emit('borrar-marcador', id);
    });

}

export const moverMarcador = (cliente: Socket) => {

    cliente.on('mover-marcador', (marcador: Marcador) => {
        mapa.moverMarcador(marcador);
        cliente.broadcast.emit('mover-marcador', marcador);
    });

}

//CONECTAR UN CLIENTE
export const conectarCliente = (cliente: Socket) => {

    const usuario = new Usuario(cliente.id);
    usauriosConectados.agregar(usuario);
}

// AQUI VAMOS A DESARROLLAR TODA LA LOGICA DE LOS SOCKETS Y EN EL SERVIDOR SOLO VAMOS A HACER REFERENCIA A ESTE ARCHIVO
//PARA MANDAR UN MSJ A TODO EL MUNDO, NECESITO UIMPORTAR EL IO. ESTO ES NECESARIO PARA DECIRLE A TODO EL MUNDO QUE TAL PERSONA SE DESCOENCTO
export const desconectar = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');

        //aqui es donde borro al usuario que se desconecto
        usauriosConectados.borrarUsuario(cliente.id);

        //aqio es donde le digo a todos que tal usuario se fue. bueno, en realidad estoy retornando la lista de usuarios activos una vez borrado el usuario desconectado.
        io.emit('usuarios-activos', usauriosConectados.getLista());
    });
}

//Escuchar Mensajes
// la propiedad io tiene el control y el conocimiento de qué personas estan conectadas. y esto es lo que vamos a usar para poder enviar mensajes a todos los usuarios. para eso recibo esa propiedad como argumento de referencia en la funcion
export const mensaje = (cliente: Socket, io: socketIO.Server) => {

    //esto es un ejemplo solo para definir el tipo de payload  payload: { de: string, cuerpo: string }
    cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {

        console.log('Mensaje Recibido', payload);

        // el mensaje que estoy recibiendo lo voy a emitir a todos los clientes que esten escuchando

        // la propiedad io tiene el control y el conocimiento de qué personas estan conectadas. y esto es lo que vamos a usar para poder enviar mensajes a todos los usuarios

        io.emit('mensaje-nuevo', payload);


    });
}

//CONFIGURAR USUARIO
export const loginWs = (cliente: Socket, io: socketIO.Server) => {

    // desde el cliente estoy enviando el nombre del evento, el payload y la funcion de callback. en el callback puedo devolver informacion al cliente. puedo mandar errores o cialquier cosa
    cliente.on('configurar-usuario', (paylad: { nombre: string }, callback: Function) => {

        //Para actualizar el nombre del usuario que se a conectado
        usauriosConectados.actualizarNombre(cliente.id, paylad.nombre);

        //aqio es donde le digo a todos que tal usuario se fue. bueno, en realidad estoy retornando la lista de usuarios activos una vez borrado el usuario desconectado.
        io.emit('usuarios-activos', usauriosConectados.getLista());

        callback({
            ok: true,
            mensaje: `Usuario ${paylad.nombre} configurado`
        });
    });
}

//OBTENER USAURIOS LOGEADOS
export const obtenerUsuarios = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('obtener-usuarios', () => {

        io.to(cliente.id).emit('usuarios-activos', usauriosConectados.getLista());
    });
}

