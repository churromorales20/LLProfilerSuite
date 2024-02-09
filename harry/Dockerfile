# Use the official Node.js 18.19.0 image
FROM node:18.19.0

WORKDIR /usr/src/app

# Copiar el código fuente de la aplicación
COPY .output/ .

# Compilar la aplicación (si es necesario)
# RUN npm run build

# Exponer el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "server/index.mjs"]
