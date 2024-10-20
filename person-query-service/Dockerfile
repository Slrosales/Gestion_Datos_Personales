# Usar una imagen base de Node.js
FROM node:14

# Crear el directorio de la aplicación
WORKDIR /usr/src/app

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto en el que correrá el servicio
EXPOSE 5001

# Comando para iniciar la aplicación
CMD [ "npm", "start" ]
