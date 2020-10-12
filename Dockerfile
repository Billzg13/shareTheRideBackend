from node:10.16.1-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

ADD . .

CMD node server
