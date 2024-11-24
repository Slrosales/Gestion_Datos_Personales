const Log = require('../models/log.model');

module.exports = async (req, res) => {
  try {
    const { documentNumber, type, startDate, endDate } = req.query; // Obtener los parámetros de consulta

    // Crear un objeto de filtro
    const filter = {};
    if (documentNumber) {
      filter.documentNumber = documentNumber;
    }
    if (type) {
      filter.type = type;
    }
    if (startDate || endDate) {
      filter.timestamp = {}; // Usar el campo correcto para la fecha
      if (startDate) {
        filter.timestamp.$gte = new Date(startDate);
      }
      if (endDate) {
        // Agregar un día al endDate para que sea inclusivo
        const endDateInclusive = new Date(endDate);
        endDateInclusive.setDate(endDateInclusive.getDate() + 1);
        filter.timestamp.$lt = endDateInclusive;
      }
    }

    // Obtener logs filtrados y ordenados por fecha
    const logs = await Log.find(filter).sort({ timestamp: -1 });
    res.status(200).json({ message: 'Logs encontrados', data: logs });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener logs' });
  }
};
