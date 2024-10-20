# Dockerfile para el Frontend (React)
FROM node:18

# Establecer directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de package.json y package-lock.json desde la carpeta pf_app
COPY pf_app/package*.json ./pf_app/

WORKDIR /app/pf_app

# Instalar las dependencias
RUN npm install

# Copiar el resto de la aplicación al contenedor
COPY pf_app .

# Construir la aplicación para producción
RUN npm run build

# Exponer el puerto 3000 para que la aplicación esté disponible
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
