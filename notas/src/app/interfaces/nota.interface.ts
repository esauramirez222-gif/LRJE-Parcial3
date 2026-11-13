export interface Nota {
    _id?: string,   // id que asigna MongoDB (no existe todavía cuando la nota se está creando)
    titulo: string,
    contenido: string,
}

// Respuesta de POST /api/notas
export interface CreateNotaResponse {
    ok: boolean,
    msg: string,
    data: Nota
}
