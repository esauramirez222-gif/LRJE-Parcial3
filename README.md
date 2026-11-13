# Notas Rápidas (Sticky Notes)

Sistema básico para guardar y mostrar notas rápidas. Una aplicación de **Angular** se conecta a un servidor de **Node.js (Express + Mongoose)**, y el servidor guarda las notas en **MongoDB**.

```
Angular (localhost:4200)  ──HTTP──▶  Node.js + Express (localhost:8080/api/notas)  ──Mongoose──▶  MongoDB (notas-db)
```

## Estructura

```
├── notas-api/   Parte 1: backend (Node.js + Mongoose)
└── notas/       Parte 2: frontend (Angular)
```

### Parte 1: Backend (`notas-api`)

| Archivo | Qué hace |
|---|---|
| `src/models/nota.model.ts` | Esquema de Mongoose `Nota` con dos campos obligatorios: `titulo` y `contenido` (String) |
| `src/controllers/notas.controller.ts` | Funciones asíncronas `getNotas` (GET) y `createNota` (POST) |
| `src/routes/notas.routes.ts` | Expone las funciones en `/api/notas` |
| `src/models/server.ts` | Clase `Server`: middlewares (CORS, JSON), rutas y conexión a la base de datos |
| `src/database/config.ts` | Conexión a MongoDB con Mongoose (base de datos `notas-db`) |

### Parte 2: Frontend (`notas`)

| Archivo | Qué hace |
|---|---|
| `src/app/services/nota-service.ts` | `NotaService`: usa `inject(HttpClient)` y una señal (`WritableSignal`) con el arreglo de notas. `cargarNotas()` hace el GET y `agregarNota()` hace el POST y actualiza la señal (actualización pesimista) |
| `src/app/pages/notas-page/` | Formulario con dos `<input>` (título y contenido) y el botón Guardar. Debajo, `@for` recorre la señal y muestra las notas |
| `src/app/components/nota-card/` | Tarjeta para mostrar cada nota |
| `src/app/interfaces/nota.interface.ts` | Interfaces `Nota` y `CreateNotaResponse` |

## Requisitos

- Node.js
- MongoDB corriendo en `127.0.0.1:27017`

## Cómo correrlo

### 1. Backend

```bash
cd notas-api
npm install
```

Copia `.env.example` como `.env` (ajusta `MONGODB_URI` si tu MongoDB usa otro usuario o contraseña):

```bash
cp .env.example .env
```

Inicia el servidor:

```bash
npm run dev
```

Debe mostrar `Servidor escuchando el puerto 8080` y `Base de datos conectada con exito`.

### 2. Frontend

En otra terminal:

```bash
cd notas
npm install
npm start
```

Abre http://localhost:4200

## API

| Método | Ruta | Body | Respuesta |
|---|---|---|---|
| GET | `/api/notas` | — | `200` con el arreglo de notas |
| POST | `/api/notas` | `{ "titulo": "...", "contenido": "..." }` | `201` con `{ ok, msg, data }` (la nota creada con su `_id`) |

Si falta `titulo` o `contenido`, el POST responde `400`.

### Punto de control con Postman

1. **POST** `http://localhost:8080/api/notas` con Body → raw → JSON:
   ```json
   { "titulo": "Nota desde Postman", "contenido": "Probando el punto de control" }
   ```
   Respuesta esperada: `201 Created`.
2. **GET** `http://localhost:8080/api/notas`.
   Respuesta esperada: `200 OK` con la nota guardada en el paso anterior.
