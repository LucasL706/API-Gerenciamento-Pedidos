const { Order, Item } = require('../models');

const createOrder = async (req, res) => {
    try {
        const data = req.body;

        // Mapeamento do JSON
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

        res.status(201).json({ message: 'Pedido criado com sucesso', orderId: order.orderId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao criar pedido', error: err.message });
    }
};

// Obter pedido pelo ID
const getOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findOne({
            where: { orderId },
            include: {
                model: Item, 
                as: 'items' // mesmo alias usado em Order.hasMany(Item) em models/Index.js
            }
        });

        if (!order) return res.status(404).json({ message: 'Pedido não encontrado' });

        res.json(order);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar pedido', error: err.message });
    }
};

// Listar todos os pedidos
const listOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [{
                model: Item,
                as: 'items' 
            }]
        });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'Pedidos não encontrados' });
        }

        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao listar pedidos', error: err.message });
    }
};

// Atualizar pedido
const updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const data = req.body;

        const order = await Order.findByPk(orderId);
        if (!order) return res.status(404).json({ message: 'Pedido não encontrado' });

        await order.update({
            value: data.valorTotal,
            creationDate: new Date(data.dataCriacao)
        });

        if (data.items) {
            await Item.destroy({ where: { orderId } }); // remove os itens antigos
            const itemsData = data.items.map(i => ({
                orderId,
                productId: parseInt(i.idItem),
                quantity: i.quantidadeItem,
                price: i.valorItem
            }));
            await Item.bulkCreate(itemsData);
        }

        res.json({ message: 'Pedido atualizado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar pedido', error: err.message });
    }
};

// Deletar pedido
const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        await Item.destroy({ where: { orderId } });
        const deleted = await Order.destroy({ where: { orderId } });

        if (!deleted) return res.status(404).json({ message: 'Pedido não encontrado' });

        res.json({ message: 'Pedido deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao deletar pedido', error: err.message });
    }
};

module.exports = { createOrder, getOrder, listOrders, updateOrder, deleteOrder };