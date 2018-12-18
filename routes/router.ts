import { Router} from 'express';
import { grafica, graficaIncrementar, mensajesConId } from '../controllers/mensajes';
import { obtenerIdUsuarios, obtenerUsuarios } from '../controllers/usuarios';
import { getMarcadores } from '../controllers/mapas';

const router = Router();

//RUTAS PARA MENSAJES
router.get('/grafica', grafica);
router.post('/grafica', graficaIncrementar);
router.post('/mensajes/:id', mensajesConId);

//RUTAS PARA OBTENER ID DE USUARIOS
router.get('/usuarios', obtenerIdUsuarios);
router.get('/usuarios/detalle', obtenerUsuarios);

//RUTAS PARA MAPAS
router.get('/mapa', getMarcadores);

export default router;