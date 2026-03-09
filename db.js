const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('order_control', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;