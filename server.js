const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/', orderRoutes);

const PORT = 3000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
}).catch(err => console.error('Erro ao conectar ao banco:', err));