const http = require('http');
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const config = require('./config');
const { apiRouter, mainRouter, authRouter, shopRouter } = require('./routers');
const setupMiddlewares = require('./middlewares');
const swaggerSpec = require('./docs/index');
const path = require('path');
const mainWS = require('./controllers/webSocket/mainWS');
const cors = require('cors');

const app = express();

app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use(cors({origin: '*'}));

setupMiddlewares(app);

app.use('/api', apiRouter);
app.use('/shop', shopRouter);
app.use('/auth', authRouter);
app.use('/', mainRouter);

const server = http.createServer(app);
mainWS(server);

const { port } = config.server;

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
