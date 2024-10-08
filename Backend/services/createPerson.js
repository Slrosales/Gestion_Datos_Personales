const Person = require('../models/person.model');
const getToponymy = require('./toponymyService');

module.exports = async (req, res) => {
  try {
    const person = new Person(req.body);

    // Validar los datos antes de guardar
    await person.validate();

    // Guardar la persona en la base de datos
    await person.save();

    // Obtener la toponimia del primer nombre
    const toponymy = await getToponymy(person.firstName);

    // Actualizar el campo toponymy con el resultado obtenido
    person.toponymy = toponymy.slice(0, 1000); // Limitar la toponimia a 300 caracteres

    // Guardar la persona nuevamente con la toponimia actualizada
    await person.save();

    // Incluir la toponimia en la respuesta
    res.status(201).json({
      message: 'Persona creada con éxito',
      data: person,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error al crear persona' });
  }
};
