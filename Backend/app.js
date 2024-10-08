const express = require('express');
const { dbconnect } = require('./config/database.config'); // Importa la conexión a la base de datos
const personRoutes = require('./routes/personRoutes');

const app = express();
app.use(express.json()); // Para manejar JSON

// Conectar a MongoDB
dbconnect(); // Usa la conexión definida en database.config.js

// Usar las rutas del API Gateway
app.use('/api', personRoutes);

// Escuchar en el puerto 5000
app.listen(5000, () => {
  console.log('API Gateway ejecutándose en el puerto 5000');
});
