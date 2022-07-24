const http = require('http');
const express = require('express');
const config = require('./config');
const { apiRouter, mainRouter, authRouter } = require('./routers');
const setupMiddlewares = require('./middlewares');
const serverAddWS = require('./controllers/webSocket/mainWS');

const app = express();

setupMiddlewares(app);

app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/', mainRouter);

const server = http.createServer(app);
serverAddWS(server);

const { port } = config.server;

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
