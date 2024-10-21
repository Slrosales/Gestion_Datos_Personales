import {apiCrear, apiConsultas} from "../axiosConfig";

export const getAll = async () => {
    try {
        const response = await apiConsultas.get('/api/person-query/all');
        return response;  // Retorna todo el objeto de respuesta
    } catch (error) {
        console.error("Error al consultar API:", error);
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
        const response = await apiCrear.get(`/api/personas/${documentNumber}`);
        return response;  // Retorna todo el objeto de respuesta
    } catch (error) {
        console.error("Error al consultar API:", error);
        return { data: [] };  // Retorna un objeto vacío en caso de error
    }
};