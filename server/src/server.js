const http = require('http');
const express = require('express');
const config = require('./config');
const { apiRouter, mainRouter } = require('./routers');
const setupMiddlewares = require('./middlewares');

const app = express();

setupMiddlewares(app);

app.use('/api', apiRouter);

app.use('/', mainRouter);

const server = http.createServer(app);

const { port } = config.server;

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
