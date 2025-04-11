FROM node:16

WORKDIR /usr/src/calculator-service

COPY package*.json ./

RUN npm install

COPY server.js .

EXPOSE 8080
CMD [ "node", "server.js" ]