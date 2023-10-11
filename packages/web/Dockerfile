FROM node:19.9.0

WORKDIR /app
COPY . .

RUN npm install --global serve
RUN yarn install
EXPOSE 3001
RUN npm run build



CMD ["npm","run","serve"]
