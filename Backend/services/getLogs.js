const Log = require('../models/log.model');

module.exports = async (req, res) => {
  try {
    const logs = await Log.find().sort({ timestamp: -1 });  // Obtener logs ordenados por fecha
    res.status(200).json({ message: 'Logs encontrados', data: logs });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener logs' });
  }
};
