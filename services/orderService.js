const { Order, Item } = require('../models');

const createOrderService = async (data) => {
    // Mapear JSON recebido para os campos do banco
    const orderData = {
        orderId: data.numeroPedido,
        value: data.valorTotal,
        creationDate: new Date(data.dataCriacao)
    };

    const itemsData = data.items.map(i => ({
        orderId: data.numeroPedido,
        productId: parseInt(i.idItem),
        quantity: i.quantidadeItem,
        price: i.valorItem
    }));

    // Salvar no banco
    const order = await Order.create(orderData);
    await Item.bulkCreate(itemsData);

    return order;
};

const getOrderService = async (orderId) => {
    const order = await Order.findOne({
        where: { orderId },
        include: [{
            model: Item,
            as: 'items'
        }]
    });

    if (!order) throw new Error('Pedido não encontrado');

    return order;
};

const listOrdersService = async () => {
    const orders = await Order.findAll({
        include: [{
            model: Item,
            as: 'items'
        }]
    });

    if (!orders || orders.length === 0) throw new Error('Nenhum pedido encontrado');

    return orders;
};

const updateOrderService = async (orderId, data) => {
    const order = await Order.findByPk(orderId);
    if (!order) throw new Error('Pedido não encontrado');

    await order.update({
        value: data.valorTotal,
        creationDate: new Date(data.dataCriacao)
    });

    if (data.items) {
        await Item.destroy({ where: { orderId } });
        const itemsData = data.items.map(i => ({
            orderId,
            productId: parseInt(i.idItem),
            quantity: i.quantidadeItem,
            price: i.valorItem
        }));
        await Item.bulkCreate(itemsData);
    }

    return order;
};

const deleteOrderService = async (orderId) => {
    await Item.destroy({ where: { orderId } });
    const deleted = await Order.destroy({ where: { orderId } });

    if (!deleted) throw new Error('Pedido não encontrado');

    return;
};

module.exports = {
    createOrderService,
    getOrderService,
    listOrdersService,
    updateOrderService,
    deleteOrderService
};