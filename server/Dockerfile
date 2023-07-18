FROM node:14

WORKDIR /server

COPY package*.json ./

# Install necessary dependencies for building native dependencies
RUN apt-get update && apt-get install -y python3 make g++

RUN npm install -g @mapbox/node-pre-gyp

RUN npm cache clean --force

RUN npm install

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "start"]