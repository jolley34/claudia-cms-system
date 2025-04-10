FROM node:23-alpine
WORKDIR /app
COPY package.json ./
COPY tsconfig.json ./
COPY server/ ./server/
RUN npm install --prefix server
COPY server/tsconfig.json ./server/
WORKDIR /app/server
RUN npm run build
# Felsökning
RUN ls -l /app/server/dist || echo "dist folder not found"
RUN ls -l /app/server/dist/src || echo "src folder not found"
RUN ls -R /app/server/dist
ENV NODE_ENV=production
EXPOSE 5001
CMD ["npm", "start"]
