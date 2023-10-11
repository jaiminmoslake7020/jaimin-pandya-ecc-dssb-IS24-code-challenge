FROM node:19.9.0

WORKDIR /app
COPY . .

RUN yarn install
EXPOSE 3000
WORKDIR /app/packages/server-app
RUN npm run docker:db:setup

CMD ["npm","start"]

