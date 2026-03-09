const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Item = sequelize.define('item', {
    orderId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'order',
            key: 'orderId'
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,  
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'item',
    timestamps: false
});

module.exports = Item;