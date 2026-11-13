import mongoose from 'mongoose';

// Esquema "Nota": solo dos campos obligatorios
const notaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'El titulo es obligatorio']
    },
    contenido: {
        type: String,
        required: [true, 'El contenido es obligatorio']
    }
});

// Mongoose guarda el modelo 'Nota' en la colección "notas"
export const NotaModel = mongoose.model('Nota', notaSchema);
