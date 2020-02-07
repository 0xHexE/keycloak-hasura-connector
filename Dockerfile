FROM node:12.13.0 AS builder
WORKDIR /usr/app

COPY package*.json ./
COPY tsconfig*.json ./

COPY ./src ./src
RUN npm ci --quiet && npm run build

# Production build
FROM node:12.13.0-alpine

ARG USER=node

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --quiet --only=production && npm audit

COPY --from=builder /usr/app/dist ./dist

RUN chmod -R 755 /app
RUN chown -R node:node /app

EXPOSE 3000

USER ${USER}

CMD [ "node", "dist/src/main.js"]
