const http = require('http');
const express = require('express');
const config = require('./config');
const {
  apiRouter,
  mainRouter,
  authRouter,
  historyRouter,
} = require('./routers');
const setupMiddlewares = require('./middlewares');

const app = express();

setupMiddlewares(app);

app.use('/api/history', historyRouter);
app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/', mainRouter);

const server = http.createServer(app);

const { port } = config.server;

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
