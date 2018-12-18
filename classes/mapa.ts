import { Marcador } from "./marcador";

export class Mapa {

    public marcadores: Marcador[] = [];
    
    constructor() { }

    getMarcadores() {
        return this.marcadores;
    }

    agregarMarcador(marcador: Marcador) {

        this.marcadores.push(marcador)
    }

    borrarMarcador( id: string ){

        //Filter me devuelve un nuevo arreglo con los datos que cumplen la condicion!
        this.marcadores = this.marcadores.filter( mark => mark.id !== id );
        return this.marcadores;
    }

    moverMarcador( marcador: Marcador ){

        for ( const i in this.marcadores ){

            //Obtengo el marcador que quiero mover.
            if( this.marcadores[i].id === marcador.id ){

                //Le asigno las nuevas latitudes y longitudes
                this.marcadores[i].lat = marcador.lat;
                this.marcadores[i].lng = marcador.lng;
                break;
            }
        }
    }
}