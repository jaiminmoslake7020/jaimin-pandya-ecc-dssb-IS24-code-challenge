# IS-24
## Instructions for IS-24 project Installation


RUN with docker

`docker-compose up`

OR 

`yarn install`

`npm run setup:db`

`npm run start:server`

`npm run run:web`

### Tech Used
This is a monorepo, it has two packages, one is web and one is server-app.

#### Server Application
Server application is built in node js with express and typescript.  

- TypeOrm
- Sqlite
- Express 
- NodeJs
- Swagger

`npm run start:server`

Swagger Docs available at http://localhost:3000/api/docs

Swagger Docs JSON available at http://localhost:3000/api/docs.json

#### Web Application
Web application is built in react. It has below technologies in it for development purpose.

- Redux
- Eslint
- Craco
- Tailwind
- React router

`npm run run:web`
Web URL at http://localhost:3001

