import { Request, Response } from 'express';
import Server from '../classes/server';
import { GraficaData } from '../classes/grafica.grafica';

const server = Server.instance;

const graficas = new GraficaData();

export function grafica(req: Request, res: Response) {

    res.json(graficas.getDataGrafica());
}

export function graficaIncrementar(req: Request, res: Response) {

    const mes = req.body.mes;
    const unidades = Number(req.body.unidades);

    graficas.incrementarValor(mes, unidades);

    server.io.emit('cambio-grafica', graficas.getDataGrafica());

    res.json(graficas.getDataGrafica());
}

export function post(req: Request, res: Response) {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        de,
        cuerpo
    };

    server.io.emit('mensaje-nuevo', payload);

    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!',
        cuerpo,
        de
    });
}

export function mensajesConId(req: Request, res: Response) {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    }

    server.io.in(id).emit('mensaje-privado', payload);

    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!',
        cuerpo,
        de,
        id
    });
}