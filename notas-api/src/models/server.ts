import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';
import notasRoutes from '../routes/notas.routes.ts';
import { dbConnection } from '../database/config.ts';

export class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        notas: '/api/notas'
    };

    constructor() {
        this.app = express();
        // Variables de entorno: node las carga con --env-file=.env (ver scripts en package.json)
        this.port = process.env.PORT || '8080';

        this.conectarDB();

        this.middlewares();
        this.routes();
    }

    private middlewares() {
        // CORS: permite que el front (http://localhost:4200) consuma la API
        this.app.use(cors());
        // Permite leer el request body en formato JSON
        this.app.use(express.json());
    }

    private routes() {
        this.app.use(this.apiPaths.notas, notasRoutes);

        // Cualquier ruta no definida responde 404 en JSON
        this.app.use((req: Request, res: Response) => {
            res.status(404).json({
                msg: 'Error - ruta no encontrada'
            });
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor escuchando el puerto ' + this.port);
        });
    }

    private async conectarDB() {
        await dbConnection();
    }
}
