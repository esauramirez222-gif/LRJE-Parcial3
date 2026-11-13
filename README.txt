Notas Rápidas

Cómo correr el proyecto

Requisitos: tener instalado Node.js y MongoDB corriendo en 127.0.0.1:27017.

1. Backend (notas-api)

   cd notas-api
   npm install

   Copiar el archivo .env.example y renombrarlo como .env
   (si MongoDB usa otro usuario o contraseña, cambiar MONGODB_URI dentro de .env)

   npm run dev

   Debe aparecer "Servidor escuchando el puerto 8080" y "Base de datos conectada con exito".

2. Frontend (notas)

   En otra terminal:

   cd notas
   npm install
   npm start

   Abrir http://localhost:4200 en el navegador.

La API queda en http://localhost:8080/api/notas (GET para obtener las notas y POST para crear una).
