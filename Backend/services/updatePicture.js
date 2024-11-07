const Person = require('../models/person.model'); // Asegúrate de esta importación
const updatePicture = async (req, res) => {
  try {
    const documentNumber = req.params.documentNumber;
    const profilePicture = req.file ? `${req.file.filename}` : null;
    console.log('profilePicture:', profilePicture);

    if (!profilePicture) {
      return res.status(400).send('No se ha proporcionado una imagen de perfil');
    }

    const person = await Person.findOneAndUpdate(
      { documentNumber: documentNumber },
      { profilePicture: profilePicture },
      { new: true }
    );

    if (!person) {
      return res.status(404).send('Persona no encontrada');
    }

    res.status(200).send('Imagen de perfil actualizada con éxito');
  } catch (error) {
    res.status(500).send(`Error al actualizar la imagen de perfil: ${error.message}`);
  }
};

module.exports = updatePicture;
