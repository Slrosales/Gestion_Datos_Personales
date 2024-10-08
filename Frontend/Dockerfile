# Dockerfile para el Frontend (React)
FROM node:18

# Establecer directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de package.json y package-lock.json primero
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de la aplicación al contenedor
COPY . .

RUN npm run build

# Exponer el puerto 3000 para que la aplicación esté disponible
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
