FROM node:8.9.4

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN npm i -g nodemon

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app
COPY docker/app/.env /usr/src/app
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]