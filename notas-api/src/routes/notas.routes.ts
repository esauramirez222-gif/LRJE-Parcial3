import { Router } from 'express';
import { getNotas, createNota } from '../controllers/notas.controller.ts';

const router = Router();

// Todas estas rutas se concatenan a /api/notas (definido en apiPaths de la clase Server)
router.get('/', getNotas);      // GET  /api/notas
router.post('/', createNota);   // POST /api/notas   (request body)

export default router;
