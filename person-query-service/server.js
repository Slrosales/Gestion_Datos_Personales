const express = require('express');
const mongoose = require('mongoose');
const personRoutes = require('./routes/person.routes'); // Asegúrate de que las rutas estén bien importadas
const cors = require('cors');

const isDocker = process.env.IS_DOCKER === 'true'; // Define esta variable en Docker Compose
const mongoURL = isDocker ? 'mongodb://mongodb:27017/gestion-datos' : 'mongodb://localhost:27017/gestion-datos';

console.log('Conectando a MongoDB en', mongoURL);

// Conectar a MongoDB
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  
  console.log(`Conectado a MongoDB en ${mongoURL}`);
}).catch((error) => {
  console.log('Error al conectar con MongoDB:', error);
});


// Crear instancia de Express
const app = express();
app.use(cors({
  origin: 'http://localhost:3000' // Permitir solo este origen
}));
// Middleware para manejar JSON
app.use(express.json());

// Registrar las rutas del servicio
app.use('/api/person-query', personRoutes);

// Configurar el puerto y levantar el servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servicio de consulta ejecutándose en el puerto ${PORT}`);
});
