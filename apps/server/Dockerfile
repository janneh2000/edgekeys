FROM node:20-alpine
WORKDIR /app
COPY package.json .
RUN npm install --production
COPY src ./src
COPY public ./public
COPY .env.example ./.env.example
COPY assets ./assets
EXPOSE 8787
CMD ["npm","start"]
