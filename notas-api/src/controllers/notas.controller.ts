import { type Request, type Response } from 'express';
import { NotaModel } from '../models/nota.model.ts';

// GET /api/notas
// Obtiene todas las notas guardadas en MongoDB
export const getNotas = async (req: Request, res: Response) => {

    try {
        const notas = await NotaModel.find();
        res.status(200).json(notas);
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener las notas'
        });
    }

};

// POST /api/notas
// Request body: { "titulo": "...", "contenido": "..." }
export const createNota = async (req: Request, res: Response) => {

    const { titulo, contenido } = req.body ?? {};

    if (!titulo || !contenido) {
        return res.status(400).json({
            ok: false,
            msg: 'Datos invalidos: titulo y contenido son obligatorios'
        });
    }

    try {
        const newNota = new NotaModel({
            titulo,
            contenido
        });

        await newNota.save();

        res.status(201).json({
            ok: true,
            msg: 'Nota creada con exito',
            data: newNota
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al crear la nota'
        });
    }

};
