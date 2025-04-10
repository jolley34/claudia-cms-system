FROM node:23-alpine
WORKDIR /app
COPY package.json ./
COPY tsconfig.json ./
COPY server/ ./server/
RUN npm install --prefix server
COPY server/tsconfig.json ./server/
WORKDIR /app/server
RUN npm run build
EXPOSE 5001
CMD ["node", "dist/src/index.js"]
