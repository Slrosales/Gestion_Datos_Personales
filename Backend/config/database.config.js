const mongoose = require('mongoose');
const Person = require('../models/person.model.js'); // Importa el modelo Person
const { sample_users } = require('../data.js'); // Importa los datos de muestra

mongoose.set('strictQuery', true); // Configura mongoose para usar consultas estrictas

// Función asíncrona para conectar a la base de datos y sembrar datos iniciales
const dbconnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); 
    await seedUsers(); // Siembra de usuarios
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.log('Error al conectar a la base de datos:', error);
  }
};

// Función asíncrona para sembrar usuarios en la base de datos
async function seedUsers() {
  const usersCount = await Person.countDocuments(); // Cuenta los documentos existentes en la colección de personas
  if (usersCount > 0) {
    console.log('Los usuarios de muestra ya han sido sembrados.'); // Si ya hay usuarios, termina la función
    return;
  }

  // Si no hay usuarios, procede a sembrarlos
  for (let user of sample_users) {
    await Person.create(user); // Crea un nuevo documento de persona en la base de datos
  }

  console.log('Siembra de usuarios de muestra completada.'); // Loguea el éxito del sembrado de usuarios
}

// Exportar la función dbconnect con CommonJS
module.exports = { dbconnect };
