# Instrucciones de Ejecución del Proyecto Gestión de Datos Personales

## Requisitos Previos

1. **Instalar Docker**: 
   - [Guía de instalación de Docker](https://docs.docker.com/get-docker/)
2. **Instalar Docker Compose** (si no está incluido en tu instalación de Docker):
   - [Guía de instalación de Docker Compose](https://docs.docker.com/compose/install/)
3. **Instalar Postman** para hacer las pruebas de la API:
   - [Guía de instalación de Postman](https://www.postman.com/downloads/)

## Paso a Paso

### 1. Clonar el repositorio

Primero, debes clonar el repositorio en tu máquina local:

```bash
git clone https://github.com/Rubens1414/Proyecto_Dise-o.git
cd Proyecto_Dise-o
```

### 2. Configuración de variables de entorno

Dentro de la carpeta `Backend`, crea un archivo `.env` con las siguientes variables:

```plaintext
MONGO_URI=mongodb://mongodb:27017/gestion-datos
GEMINI_API_KEY=tu_clave_de_api  # Reemplazar por tu clave real de la API de Google Gemini
```

### 3. Construcción y ejecución de contenedores con Docker

Usa Docker Compose para levantar los servicios del proyecto:

```bash
docker-compose up --build
```

Esto construirá y levantará los siguientes servicios:
- **MongoDB**: La base de datos.
- **Backend**: API Gateway.
- **Person Query Service**: Microservicio para consultas de personas.
- **Frontend**: Interfaz de usuario (si está configurado).

#### Verificar que todo esté en funcionamiento:
- El **Backend** estará disponible en `http://localhost:5000`.
- El **Person Query Service** estará disponible en `http://localhost:5001`.

### 4. Pruebas de la API con Postman

#### A) **Crear una persona**
1. Método: **POST**
2. URL: `http://localhost:5000/api/personas`
3. Body (en formato JSON):
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

#### B) **Consultar una persona por número de documento**
1. Método: **GET**
2. URL: `http://localhost:5001/api/person-query/personas/1022525679`

#### C) **Consultar todos los registros de logs**
1. Método: **GET**
2. URL: `http://localhost:5000/api/logs`

### 5. Actualizar los contenedores automáticamente (opcional)

Si necesitas que los contenedores se actualicen automáticamente cada vez que hagas cambios en el código, puedes configurar `nodemon`. Esto ya está configurado en el archivo `package.json` del backend. Para habilitarlo en Docker, asegúrate de que el `Dockerfile` utilice el comando `npm run dev` para levantar el servidor de desarrollo.

### 6. Acceso a los registros de transacciones (logs)

Puedes acceder a los logs usando la API de logs:
1. **Consultar todos los logs**:
   - Método: **GET**
   - URL: `http://localhost:5000/api/logs`

Esta llamada devuelve un listado de todas las transacciones realizadas, con detalles como el tipo de acción (crear, eliminar, actualizar) y la fecha y hora en que se realizó la operación.