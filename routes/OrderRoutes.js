const express = require('express');
const router = express.Router();
const { createOrder, getOrder, listOrders, updateOrder, deleteOrder } = require('../controllers/orderController');

router.post('/order', createOrder);
router.get('/order/list', listOrders);
router.get('/order/:orderId', getOrder);
router.put('/order/:orderId', updateOrder);
router.delete('/order/:orderId', deleteOrder);

module.exports = router;