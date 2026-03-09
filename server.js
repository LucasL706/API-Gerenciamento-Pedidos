const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const orderRoutes = require('./routes/orderRoutes');
const setupSwagger = require('./documentation/swagger');

const app = express();
app.use(bodyParser.json());

// rotas para endpoints da API
app.use('/', orderRoutes);

// swagger
setupSwagger(app);

const PORT = 3000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
        console.log(`Documentação Swagger em http://localhost:${PORT}/api-docs`);
    });
}).catch(err => console.error('Erro ao conectar ao banco:', err));