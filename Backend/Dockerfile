# Dockerfile para el Backend (API Gateway)
FROM node:18

# Establecer directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de package.json y package-lock.json primero
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Instalar Nodemon globalmente en el contenedor
RUN npm install -g nodemon

# Copiar el resto de la aplicación al contenedor
COPY . .

# Exponer el puerto 5000 para que la aplicación esté disponible
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
