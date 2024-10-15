# Proyecto Gestión de Datos Personales

## Descripción del Proyecto
Este proyecto tiene como objetivo crear una aplicación para la **gestión de datos personales** que permita realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar), así como registrar transacciones en un log. Además, cada registro de persona incluirá la toponimia del nombre, obtenida mediante la integración con la API de Google Gemini.

## Tecnologías Usadas
- **Backend**: Node.js, Express
- **Base de Datos**: MongoDB (en Docker)
- **Contenedores**: Docker
- **Integración API**: Google Gemini para la obtención de la toponimia del nombre
- **Cliente API**: Postman para pruebas
- **Control de Versiones**: GitHub

## Requisitos del Proyecto

| Actividad                                                                                                                                                     | Estado               | Puntos |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------|--------|
| La aplicación debe desplegarse en contenedores.                                                                                                               | **Completado**: Backend y base de datos en contenedores. | 15     |
| La aplicación debe tener la funcionalidad de un CRUD y adicionalmente registrar todas las transacciones en un log.                                             | **Completado** | 15     |
| Al grabar un registro se despliega el origen del nombre según la toponimia.                                                                                    | **Completado**: API de Google Gemini integrada y funcionando. | 10     |
| Los campos a capturar son los mostrados en la pantalla principal.                                                                                              | **Completado** | 2      |
| Realizar las validaciones requeridas.                                                                                                                          | **Completado**: Validaciones implementadas. | 4      |
| Cada opción del menú se debe desarrollar en un microservicio.                                                                                                  | **Completado**: Microservicios de CRUD y consulta implementados. | 6      |
| La opción de "Consultar" debe estar en un contenedor independiente del resto de la aplicación y se debe poder habilitar/deshabilitar según demanda.             | **Completado** | 5      |
| La base de datos debe estar en un contenedor independiente al del resto de la aplicación.                                                                      | **Completado** | 4      |
| La opción de consulta de log debe permitir búsqueda por tipo y documento, y por fecha de transacción.                                                          | **Completado** | 4      |

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Rubens1414/Proyecto_Dise-o.git
   cd Proyecto_Dise-o
   ```

2. Crear un archivo `.env` en el directorio del backend con las siguientes variables de entorno:
   ```plaintext
   MONGO_URI=mongodb://localhost:27017/gestion-datos
   GEMINI_API_KEY=tu_clave_de_api
   ```

3. Construir y levantar los contenedores:
   ```bash
   docker-compose up --build
   ```

4. El backend estará disponible en `http://localhost:5000`.

## Endpoints

### Crear una Persona
```http
POST /api/personas
```
Body (JSON):
```json
{
    "firstName": "Laura",
    "secondName": "Gómez",
    "lastName": "Rosales",
    "birthDate": "1995-06-15",
    "gender": "Femenino",
    "email": "laura.gomez@example.com",
    "phone": "3118001234",
    "documentNumber": "1022525679",
    "documentType": "Cédula"
}
```

### Consultar una Persona
```http
GET /api/personas/:documentNumber
```

### Consultar todos los Logs
```http
GET /api/logs
```

## Estado Actual del Proyecto

### Funcionalidades Completadas
- Despliegue de backend y base de datos en contenedores Docker.
- Funcionalidad completa de CRUD para la gestión de personas.
- Integración con la API de Google Gemini para obtener la toponimia del nombre.
- Captura de campos especificados en la rúbrica.
- Registro de todas las transacciones (creación, actualización y eliminación) en un log.
- Implementación de consulta de logs por tipo de documento y fecha de transacción.

### Funcionalidades Pendientes
- Optimización de la funcionalidad para habilitar y deshabilitar microservicios según demanda.
