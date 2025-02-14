
<div align="center">
  <h1>
     Proyecto Gestión de Datos Personales
  </h1>

[![GitHub Slrosales](https://img.shields.io/badge/by-Slrosales-purple)](https://github.com/Slrosales)  
[![GitHub lellerena](https://img.shields.io/badge/by-Rubens1414-blue)](https://github.com/Rubens1414)
</div>

## Descripción del Proyecto
El **Proyecto de Gestión de Datos Personales** tiene como objetivo desarrollar una aplicación que permita:  
- Realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre registros de personas.  
- Registrar todas las transacciones en un log para su posterior consulta.  
- Obtener y mostrar el **origen toponímico** de los nombres ingresados, utilizando un **endpoint personalizado** construido con **OpenAI**.  

La aplicación incluye un conjunto completo de validaciones para garantizar la integridad y precisión de los datos ingresados.

## Funcionalidades Principales
- **Crear Personas**: Captura de información personal, incluyendo nombres, apellidos, fecha de nacimiento, género, correo electrónico, número de documento, tipo de documento y foto.  
- **Modificar Datos Personales**: Actualización de registros existentes.  
- **Consultar Datos Personales**: Visualización de información almacenada.  
- **Borrar Personas**: Eliminación de registros de personas.  
- **Consultar Log**: Acceso al registro de transacciones realizadas.  
- **Origen del Nombre**: Al crear un registro, se muestra el origen toponímico del nombre ingresado, utilizando un **endpoint personalizado** construido con **OpenAI**.  

## Validaciones Requeridas
- **Primer Nombre y Segundo Nombre**: No deben ser números y no deben exceder los 30 caracteres.  
- **Apellidos**: No deben ser números y no deben exceder los 60 caracteres.  
- **Fecha de Nacimiento**: Seleccionable desde un calendario o ingresada en formato `dd-mmm-yyyy`.  
- **Género**: Lista desplegable con 4 opciones: Masculino, Femenino, No binario, Prefiero no reportar.  
- **Correo Electrónico**: Validación de formato de correo electrónico.  
- **Celular**: Debe ser un número de 10 caracteres.  
- **Número de Documento**: Debe ser un número y no superar los 10 caracteres.  
- **Tipo de Documento**: Lista desplegable con opciones: Tarjeta de Identidad, Cédula.  
- **Foto**: Validación para que el tamaño del archivo no supere los 2 MB.  
- **Origen del Nombre**: Se obtiene utilizando **OpenAI** para generar información toponímica.  

## Tecnologías Utilizadas
- **Backend**: Node.js, Express  
- **Base de Datos**: MongoDB (en Docker)  
- **Contenedores**: Docker  
- **Integración API**: Google Gemini para la obtención de la toponimia del nombre  
- **Cliente API**: Postman para pruebas  
- **Control de Versiones**: GitHub  

## Requisitos Previos
Antes de ejecutar este proyecto, asegúrate de tener instalado:  
- [Node.js](https://nodejs.org/)  
- [Docker](https://www.docker.com/)  
- [Postman](https://www.postman.com/)  
- [Git](https://git-scm.com/)  

## Instalación
1. Clona este repositorio:  
   ```bash
   git clone https://github.com/Slrosales/Gestion_Datos_Personales.git
   cd Gestion_Datos_Personales
   ```
2. Instala las dependencias del proyecto:  
   ```bash
   npm install
   ```
3. Configura el archivo `.env` con las variables necesarias para la conexión a MongoDB y la integración con OpenAI, por ejemplo:  
   ```plaintext
   MONGO_URI=mongodb://mongodb:27017/gestion-datos
   OPENAI_API_KEY=tu_clave_de_openai
   ```

## Ejecución
Para iniciar el proyecto, utiliza el siguiente comando:  
```bash
docker-compose up --build
```
Esto levantará el backend en un contenedor de Docker y conectará la base de datos en MongoDB.  

## Endpoints Principales
La API incluye las siguientes rutas principales:  
- **POST** `/api/personas` - Crear una nueva persona.  
- **GET** `/api/personas` - Consultar todas las personas.  
- **PUT** `/api/personas/:id` - Modificar datos personales.  
- **DELETE** `/api/personas/:id` - Borrar una persona.  
- **GET** `/api/logs` - Consultar el registro de transacciones.  
 

## Colaboradores
- Rubens Echeverria (Líder - Frontend) 
- Laura Gómez (Backend) 
