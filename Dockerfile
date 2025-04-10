FROM node:23-alpine
WORKDIR /app

# Kopiera root package.json och tsconfig.json
COPY package.json ./
COPY tsconfig.json ./

# Kopiera server-mappen
COPY server/ ./server/

# Installera beroenden för servern
RUN npm install --prefix server

# Bygg servern
WORKDIR /app/server
RUN npm run build

# Sätt miljövariabler och exponera port
ENV NODE_ENV=production
EXPOSE 5001
CMD ["node", "dist/server/src/index.js"]