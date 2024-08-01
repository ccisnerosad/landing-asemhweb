# Usar la imagen oficial de Node.js 18 como base
FROM node:18

# Establecer el directorio de trabajo en /app
WORKDIR /app

# Copiar el package.json y el package-lock.json al contenedor
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto del código de la aplicación al contenedor
COPY . .

# Construir la aplicación
RUN npm run build

# Exponer el puerto en el que la aplicación estará escuchando
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "server.js"]
