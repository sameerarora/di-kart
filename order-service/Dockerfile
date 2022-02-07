FROM node:17

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3002

ENV DB_HOST_NAME=host.docker.internal

CMD [ "node", "dist/app.js" ]
