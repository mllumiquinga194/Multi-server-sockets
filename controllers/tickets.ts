import { Request, Response } from 'express';
import { TicketControl } from '../classes/ticket-control';

export const ticket = new TicketControl();


export function getData( req: Request, res: Response ){

    // res.json( mapa.getMarcadores() );
    res.json( ticket.getUltimoTicket());
}