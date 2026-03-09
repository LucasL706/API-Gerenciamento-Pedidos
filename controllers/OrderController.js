// controllers/orderController.js
const {
    createOrderService,
    getOrderService,
    listOrdersService,
    updateOrderService,
    deleteOrderService
} = require('../services/orderService');

const createOrder = async (req, res) => {
    try {
        const order = await createOrderService(req.body);
        res.status(201).json({ message: 'Pedido criado com sucesso', orderId: order.orderId });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar pedido', error: err.message });
    }
};

const getOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await getOrderService(orderId);
        res.json(order);
    } catch (err) {
        if (err.message === 'Pedido não encontrado') {
            return res.status(404).json({ message: err.message });
        }
        res.status(500).json({ message: 'Erro ao buscar pedido', error: err.message });
    }
};

const listOrders = async (req, res) => {
    try {
        const orders = await listOrdersService();
        res.json(orders);
    } catch (err) {
        if (err.message === 'Nenhum pedido encontrado') {
            return res.status(404).json({ message: err.message });
        }
        res.status(500).json({ message: 'Erro ao listar pedidos', error: err.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        await updateOrderService(orderId, req.body);
        res.json({ message: 'Pedido atualizado com sucesso' });
    } catch (err) {
        if (err.message === 'Pedido não encontrado') {
            return res.status(404).json({ message: err.message });
        }
        res.status(500).json({ message: 'Erro ao atualizar pedido', error: err.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        await deleteOrderService(orderId);
        res.json({'Pedido deletado com sucesso'})
    } catch (err) {
        if (err.message === 'Pedido não encontrado') {
            return res.status(404).json({ message: err.message });
        }
        res.status(500).json({ message: 'Erro ao deletar pedido', error: err.message });
    }
};

module.exports = { createOrder, getOrder, listOrders, updateOrder, deleteOrder };