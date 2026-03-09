const { DataTypes } = require('sequelize');
const sequelize = require('../db');

// Definição dos campos da tabela Order
const Order = sequelize.define('order', {
    orderId: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    value: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    creationDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'order',
    timestamps: false
});

module.exports = Order;