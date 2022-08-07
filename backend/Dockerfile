FROM node:16 as dev

WORKDIR /usr/src/app/backend

COPY package*.json ./

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]


FROM node:16 as prod

WORKDIR /usr/src/app/backend

COPY --from=dev /usr/src/app/backend .

EXPOSE 8080

CMD [ "node", "server.js" ]