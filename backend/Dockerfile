FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --only=production 2>/dev/null || npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "src/index.js"]