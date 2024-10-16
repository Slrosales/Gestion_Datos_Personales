const dotenv = require('dotenv');
dotenv.config(); // Carga las variables de entorno desde el archivo .env

const express = require('express');
const cors = require('cors');
const personRouter = require('./routes/person.routes.js'); // Importa el router de personas
const logRouter = require('./routes/log.routes.js');       // Importa el router de logs
const { dbconnect } = require('./config/database.config.js'); // Función de conexión a la base de datos

dbconnect(); // Ejecuta la función de conexión a la base de datos

const app = express(); // Crea una instancia de una aplicación Express

app.use(express.json()); // Habilita el middleware para parsear JSON, permitiendo que la app maneje solicitudes JSON

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"], // Restringe las solicitudes cruzadas solo a este origen
  })
);

// Registra los routers para personas y logs
app.use("/api/personas", personRouter);  // Rutas para las personas
app.use("/api/logs", logRouter);         // Rutas para los logs

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Bienvenido al servidor de gestión de datos personales');
});
