import { Usuario } from "./usuario";

//TODA LA LOGICA DE LOS USUARIOS

export class UsuariosLista{

    private lista: Usuario[] = [];

    constructor () {

    }

    //AGREGAR UN USUARIO
    public agregar( usuarios: Usuario ){

        this.lista.push( usuarios );

        console.log( this.lista );

        return usuarios;
        
    }

    //ACTUALIZAR NOMBRE
    public actualizarNombre( id: string, nombre: string ){

        for( let usuario of this.lista ){

            if( usuario.id === id ){
                usuario.nombre = nombre;
                break;
            }
        }

        console.log('------------Actualizando Usuario-----------');
        console.log( this.lista );
        
        
    }

    //OBTENER TODA LA LISTA DE USUARIOS
    public getLista(){
        return this.lista.filter( usuario => usuario.nombre !== 'sin-nombre' );
    }

    //RETORNAR UN USUARIO
    public getUsuario( id: string ){

        return this.lista.find( usuario => usuario.id === id );
    }

    //OBTERNER USUARIOS DE UNA SALA
    public getUsuariosEnSala( sala: string ){

        return this.lista.filter( usuario => usuario.sala === sala );
    }

    //BORRAR USAURIO
    public borrarUsuario( id: string ){

        const tempUsuario = this.getUsuario( id );

        this.lista = this.lista.filter( usuario => usuario.id !== id );

        return tempUsuario;
    }
}