const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestión de Alertas, Fondos y Asignaciones',
      version: '1.0.0',
      description: 'Documentación de la API para gestión de alertas, fondos y asignaciones.',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./routes/*.js'], // Ruta a los archivos de rutas
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
