import mongoose from 'mongoose';

export const dbConnection = async () => {

    try {
        // El usuario y la contraseña van dentro de la URL (ver MONGODB_URI en .env)
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://admin:admin@127.0.0.1:27017/?authSource=admin', {
            dbName: 'notas-db'
        });
        console.log('Base de datos conectada con exito');
    } catch (error) {
        console.log(error);
    }

};
