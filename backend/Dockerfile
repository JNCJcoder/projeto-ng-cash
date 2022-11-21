FROM node:18.12.1-alpine

RUN mkdir -p /app

COPY package.json app/package.json

WORKDIR /app

COPY . /app

RUN npm install --silent

RUN npm run build

CMD npm run start