const swaggerJsDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Modern-and-Magic-Chess-Online',
    version: '1.0.0',
  },
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./src/docs/*.js'],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

module.exports = swaggerSpec;
