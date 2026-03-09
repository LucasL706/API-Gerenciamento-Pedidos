const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Pedidos",
            version: "1.0.0",
            description: "API para gerenciar pedidos e itens"
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Servidor local"
            }
        ]
    },
    apis: ["./routes/*.js"] // caminho para os arquivos com suas rotas
};

const swaggerSpec = swaggerJsDoc(options);

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;