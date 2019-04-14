FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
RUN npm prune
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]
