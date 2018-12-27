import data from '../datos/data.json';
import * as fs from 'fs';

export class Ticket {

    constructor(public numero: number,
        public escritorio?: number) {
    }
}

export class TicketControl {

    public ultimo: number = 0;
    public hoy: number = new Date().getDate();
    public data: {} = data;
    public tickets: any[] = [];
    public ultimos4: any[] = [];
    public escritorio: number[] = [0];

    constructor() {

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }

    }

    getData() {
        return data;
    }

    siguiente() {

        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo);//creo una instancia de mi ticket y le indico que es el ultimo

        this.tickets.push(ticket);//lo agrego en mi arreglo de tickets pendientes


        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() {

        return `Ticket ${this.ultimo}`;

    }
    getUltimos4() {

        if (this.ultimos4.length === 0) {
            return [{ numero: 0, escritorio: 0 }]
        }
        return this.ultimos4;

    }

    atenderTicket(escritorio: number) {//recibe un escritorio a quien le asignare un numero a atender

        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero;// para obtener el numero del primer ticket del arreglo,
        this.tickets.shift();//para borrar el primer elemento de un arregloo

        let atenderTicket = new Ticket(numeroTicket, escritorio);//ya tengo un ticket listo para ser atendido.
        console.log('TICKETS ATENDIDO', atenderTicket);


        this.ultimos4.unshift(atenderTicket);//esta funcion agrega el elemento al inicio del arreglo. DARA la ilusion optica de que se iran moviendo los elementos porque al agregar uno nuevo, el que estaba de primero, pasa al segundo puesto

        //en este arreglo solo habran 4 ticket
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); //borra el ultimo elemento de este arreglo de 4.
        }

        console.log('Ultimos 4 ', this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;
    }

    reiniciarConteo() {

        this.tickets = [];
        this.ultimos4 = [];
        this.ultimo = 0;
        console.log('Se ha reinicializado el conteo');
        this.grabarArchivo();

    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets, // para grabar en el arreglo todos los tickets que esten pendiente de atender
            ultimos4: this.ultimos4
        }
        // guardo los datos en un string de json
        let jsonDataString = JSON.stringify(jsonData);

        //para usar esto tuve que inportarel fs
        fs.writeFileSync('datos/data.json', jsonDataString);
    }

    checkEscritorios(escritorio: number) {
        let existe = this.escritorio.find( numero => {
            return numero === escritorio
        });

        if (existe) {

            return true;
        } else {

            this.escritorio.push(escritorio);
            
            return false;
        }

    }

    liberarEscritorio(escritorio: number){

        this.escritorio = this.escritorio.filter( numero => {
            return numero !== escritorio;
        });
        return this.escritorio;
    }
}