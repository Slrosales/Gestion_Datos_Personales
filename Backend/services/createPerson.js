const Person = require('../models/person.model');
const getToponymy = require('./toponymyService');
const Log = require('../models/log.model');  // Importar el modelo de log

module.exports = async (req, res) => {
  try {
    const { email, documentNumber } = req.body;

    // Verificar si ya existe una persona con el mismo email o número de documento
    const existingPerson = await Person.findOne({
      $or: [{ email }, { documentNumber }]
    });

    if (existingPerson) {
      return res.status(400).json({
        message: 'El correo electrónico o el número de documento ya están registrados. Por favor, valida la información.',
      });
    }

    const person = new Person(req.body);

    if(req.file) {
      person.profilePicture = req.file.filename;
    }else{
      person.profilePicture = `profile.jpg`;
    }

    // Validar los datos antes de guardar
    await person.validate();


    // Guardar la persona en la base de datos
    await person.save();

    // Obtener la toponimia del primer nombre
    const toponymy = await getToponymy(person.firstName);

    // Actualizar el campo toponymy con el resultado obtenido
    person.toponymy = toponymy.slice(0, 1000); // Limitar la toponimia a 1000 caracteres

    // Guardar la persona nuevamente con la toponimia actualizada
    await person.save();

    // Registrar la transacción en el log
    await Log.create({
      action: 'create',
      documentNumber: person.documentNumber,
      details: person,  // Guardar todos los detalles de la persona
      timestamp: new Date()  // Registrar la fecha y hora de la transacción
    });

    // Incluir la toponimia en la respuesta
    res.status(201).json({
      message: 'Persona creada con éxito',
      data: person,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error al crear persona' });
  }
};
