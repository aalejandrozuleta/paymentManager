# Dockerfile

# Usa una imagen base de Node.js
FROM node:20

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Compila el código TypeScript
RUN npm run build

# Expone el puerto que usa la aplicación (ajusta si es necesario)
EXPOSE 8000

# Comando para iniciar la aplicación
CMD [ "npm", "start" ]
