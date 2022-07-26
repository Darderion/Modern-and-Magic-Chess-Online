const http = require('http');
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const config = require('./config');
const { apiRouter, mainRouter, authRouter } = require('./routers');
const setupMiddlewares = require('./middlewares');
const swaggerSpec = require('./docs/index');
const mainWS = require('./controllers/webSocket/mainWS');

const app = express();

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

setupMiddlewares(app);

app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/', mainRouter);

const server = http.createServer(app);
mainWS(server);

const { port } = config.server;

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
