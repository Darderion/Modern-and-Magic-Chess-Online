const http = require('http');
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const config = require('./config');
const { apiRouter, mainRouter, authRouter } = require('./routers');
const setupMiddlewares = require('./middlewares');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Modern-and-Magic-Chess-Online',
    version: '1.0.0',
  },
};

const options = {
  swaggerDefinition,
  apis: ['./src/docs/*.js'],
};

const swaggerSpec = swaggerJsDoc(options);

const app = express();

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

setupMiddlewares(app);

app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/', mainRouter);

const server = http.createServer(app);

const { port } = config.server;

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
