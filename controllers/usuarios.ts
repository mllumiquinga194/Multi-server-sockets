import { Request, Response } from 'express';
import Server from '../classes/server';
import { usauriosConectados } from '../sockets/socket';

const server = Server.instance;

//SERVICIO PARA OBTENER TODOS LOS DE IDS DE LOS USUARIOS

export function obtenerIdUsuarios(req: Request, res: Response) {


    //Esta funcion barre todos los clientes y me evulve un arreglo de string con el id de cada uno de ellos
    server.io.clients((err: any, clientes: string[]) => {

        if (err) {
            return res.json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            clientes
        });
    });


}

// OBTENER USUARIOS Y SUS NOMBRES
export function obtenerUsuarios(req: Request, res: Response) {

        res.json({
            ok: true,
            clientes: usauriosConectados.getLista()
        });
}
