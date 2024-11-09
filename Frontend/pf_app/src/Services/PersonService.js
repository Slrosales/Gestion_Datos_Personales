import {apiCrear, apiConsultas} from "../axiosConfig";

export const getAll = async () => {
    try {
        const response = await apiConsultas.get('/api/person-query/all');
        return response;  // Retorna todo el objeto de respuesta
    } catch (error) {
        throw new Error("Error en la obtención de datos");  // Lanza una excepción en caso de error
    }
};


// Función para crear una nueva persona
export const create = async (personData) => {
  try {
      let response;
      
      // Comprobar si profilePicture existe en personData
      if (personData.profilePicture) {
          // Crear FormData y añadir cada campo
          const formData = new FormData();
          Object.keys(personData).forEach(key => {
              formData.append(key, personData[key]);
          });

          // Enviar con FormData (incluye el archivo)
          response = await apiCrear.post('/api/personas/', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });
      } else {
          // Si no hay imagen, enviar como JSON
          response = await apiCrear.post('/api/personas/', personData);
      }
     
      return {
          success: true,
          status: response.status,
          data: response.data,
      };
  } catch (error) {
      return {
          success: false,
          status: error.response ? error.response.status : 500,
          message: error.response && error.response.data ? error.response.data.message : 'Ahora mismo no se puede crear la persona, inténtelo más tarde',
      };
  }
};


// Buscar persona por documento
export const getByDocument = async (documentNumber) => {
    try {
        const response = await apiCrear.get(`/api/personas/${documentNumber}`);
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

  export const update_img = async (documentNumber, formData) => {
    try {
        // Verificar el contenido de FormData antes de enviarlo
        console.log("FormData content:", formData.get('profilePicture')); 

        // Realizar la solicitud de actualización de la imagen
        const response = await apiCrear.post(`/api/personas/upload/${documentNumber}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        // Retornar respuesta exitosa
        return {
            success: true,
            status: response.status,
            data: response.data
        };
    } catch (error) {
        console.error('Error al actualizar la imagen de la persona:', error);
        return {
            success: false,
            status: error.response ? error.response.status : 500,
            message: error.response && error.response.data ? error.response.data.message : 'Error desconocido al actualizar la imagen'
        };
    }
};
