const Order = require('./Order');
const Item = require('./Item');

// Aplicar relacionamentos
Order.hasMany(Item, { foreignKey: 'orderId', as: 'items' });
Item.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

module.exports = { Order, Item };