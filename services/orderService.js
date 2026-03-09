const { Order, Item } = require('../models');

const createOrderService = async (data) => {
    try{
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
    } catch (err) {
        const error = new Error('Falha ao criar pedido');
        error.status = 500;
        throw error;
    }
};

const getOrderService = async (orderId) => {
    const order = await Order.findOne({
        where: { orderId },
        include: [{
            model: Item,
            as: 'items'
        }]
    });

    if (!order) {
        const error = new Error('Pedido não encontrado');
        error.status = 404;
        throw error;
    }

    return order;
};

const listOrdersService = async () => {
    const orders = await Order.findAll({
        include: [{
            model: Item,
            as: 'items'
        }]
    });

    if (!orders || orders.length === 0){
        const error = new Error('Nenhum pedido encontrado');
        error.status = 404;
        throw error;
    }

    return orders;
};

const updateOrderService = async (orderId, data) => {
    const order = await Order.findByPk(orderId);
    
    if (!order) {
        const error = new Error('Pedido não encontrado');
        error.status = 404;
        throw error;
    }

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

    if (!deleted){
        const error = new Error('Pedido não encontrado');
        error.status = 404;
        throw error;
    }

    return;
};

module.exports = {
    createOrderService,
    getOrderService,
    listOrdersService,
    updateOrderService,
    deleteOrderService
};