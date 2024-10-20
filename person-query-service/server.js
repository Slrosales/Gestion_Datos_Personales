const express = require('express');
const mongoose = require('mongoose');
const personRoutes = require('./routes/person.routes'); // Asegúrate de que las rutas estén bien importadas

// Conectar a MongoDB
mongoose.connect('mongodb://mongodb:27017/gestion-datos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado a MongoDB en person-query-service');
}).catch((error) => {
  console.log('Error al conectar con MongoDB:', error);
});

// Crear instancia de Express
const app = express();

// Middleware para manejar JSON
app.use(express.json());

// Registrar las rutas del servicio
app.use('/api/person-query', personRoutes);

// Configurar el puerto y levantar el servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servicio de consulta ejecutándose en el puerto ${PORT}`);
});
