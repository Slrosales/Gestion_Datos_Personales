import {apiCrear, apiConsultas} from "../axiosConfig";

export const getAll = async () => {
    try {
        const response = await apiConsultas.get('/api/person-query/all');
        return response;  // Retorna todo el objeto de respuesta
    } catch (error) {
       
        return { data: [] };  // Retorna un objeto vacío en caso de error
    }
};

// Función para crear una nueva persona
export const create = async (personData) => {
    try {
        const response = await apiCrear.post('/api/personas/', personData);
        return {
            success: true,
            status: response.status,  // Código de estado de la respuesta
            data: response.data,  // Datos de la respuesta
        }  // Retorna todo el objeto de respuesta si todo va bien
    } catch (error) {
     
        // Retornar un objeto con el código de error y el mensaje para manejarlo en el frontend
        return {
            success: false,
            status: error.response ? error.response.status : 500,  // Código de estado del error, si existe
            message: error.response && error.response.data ? error.response.data.message : 'Error desconocido al crear persona',
        };
    }
};


// Buscar persona por documento
export const getByDocument = async (documentNumber) => {
    try {
        const response = await apiConsultas.get(`/api/person-query/${documentNumber}`);
        return response;  // Retorna todo el objeto de respuesta
    } catch (error) {
        
        return { data: [] };  // Retorna un objeto vacío en caso de error
    }
};

//Eliminar persona por documento
export const deleteByDocument = async (documentNumber) => {
    try {
        const response = await apiCrear.delete(`/api/personas/${documentNumber}`);
        return {
            success: true,
            status: response.status,  // Código de estado de la respuesta
            data: response.data,  // Datos de la respuesta
        } 
    } catch (error) {
       
        return {
            success: false,
            status: error.response ? error.response.status : 500,  // Código de estado del error, si existe
            message: error.response && error.response.data ? error.response.data.message : 'Error desconocido al eliminar persona',
        };
    }
};

// Actualizar persona con número de documento
const validFields = ['firstName', 'secondName', 'lastName', 'birthDate', 'gender', 'email', 'phone', 'documentNumber', 'documentType', 'toponymy'];

export const updateByDocument = async (documentNumber, personData) => {
    try {
      // Filtrar solo los campos válidos
      const updateData = {};
      validFields.forEach(field => {
        if (personData[field]) {
          updateData[field] = personData[field];
        }
      });
  
      // Obtener datos previos a la actualización
      const personBeforeUpdate = await apiCrear.get(`/api/personas/${documentNumber}`);
      if (!personBeforeUpdate || !personBeforeUpdate.data) {
        return {
          success: false,
          status: 404,
          message: 'Persona no encontrada antes de la actualización'
        };
      }
  
      // Enviar solicitud de actualización
      const response = await apiCrear.put(`/api/personas/${documentNumber}`, updateData);
  
      // Obtener la respuesta actualizada
      const personAfterUpdate = response.data;
  
      // Crear log en el frontend (si es necesario)
      const log = {
        action: 'update',
        documentNumber: documentNumber,
        details: {
          before: personBeforeUpdate.data,
          after: personAfterUpdate
        }
      };
  
      // Devolver la respuesta con la estructura esperada
      return {
        success: true,
        status: response.status,
        data: {
          message: 'Persona actualizada con éxito',
          updatedData: personAfterUpdate,
          log: log
        }
      };
    } catch (error) {
      console.error('Error al actualizar persona:', error);
      return {
        success: false,
        status: error.response ? error.response.status : 500,
        message: error.response && error.response.data ? error.response.data.message : 'Error desconocido al actualizar persona',
      };
    }
  };

