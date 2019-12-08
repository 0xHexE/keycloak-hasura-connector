FROM node:12.13.0 AS builder
WORKDIR /usr/app

COPY package*.json ./
COPY tsconfig*.json ./

COPY ./src ./src
RUN npm ci --quiet && npm run build

# Production build
FROM node:12.13.0-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --quiet --only=production

COPY --from=builder /usr/app/dist ./dist

EXPOSE 3000

CMD [ "node", "dist/src/main.js"]
