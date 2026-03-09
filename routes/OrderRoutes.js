const express = require('express');
const router = express.Router();
const { createOrder, getOrder, listOrders, updateOrder, deleteOrder } = require('../controllers/orderController');

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Cria um novo pedido
 *     tags:
 *       - Pedidos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numeroPedido:
 *                 type: string
 *                 example: "v10089015vdb-01"
 *               valorTotal:
 *                 type: number
 *                 example: 10000
 *               dataCriacao:
 *                 type: string
 *                 example: "2023-07-19T12:24:11.529Z"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     idItem:
 *                       type: string
 *                       example: "2434"
 *                     quantidadeItem:
 *                       type: integer
 *                       example: 1
 *                     valorItem:
 *                       type: number
 *                       example: 1000
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       500:
 *         description: Erro ao criar pedido
 */
router.post('/order', createOrder);

/**
 * @swagger
 * /order/list:
 *   get:
 *     summary: Lista todos os pedidos
 *     tags:
 *       - Pedidos
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 *       404:
 *         description: Nenhum pedido encontrado
 *       500:
 *         description: Erro ao listar pedidos
 */
router.get('/order/list', listOrders);

/**
 * @swagger
 * /order/{orderId}:
 *   get:
 *     summary: Obtém um pedido pelo ID
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *           example: "v10089015vdb-01"
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Pedido retornado com sucesso
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Erro ao buscar pedido
 */
router.get('/order/:orderId', getOrder);

/**
 * @swagger
 * /order/{orderId}:
 *   put:
 *     summary: Atualiza um pedido existente
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *           example: "v10089015vdb-01"
 *         description: ID do pedido a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valorTotal:
 *                 type: number
 *                 example: 12000
 *               dataCriacao:
 *                 type: string
 *                 example: "2023-07-20T10:00:00.000Z"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     idItem:
 *                       type: string
 *                       example: "2434"
 *                     quantidadeItem:
 *                       type: integer
 *                       example: 2
 *                     valorItem:
 *                       type: number
 *                       example: 1200
 *     responses:
 *       200:
 *         description: Pedido atualizado com sucesso
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Erro ao atualizar pedido
 */
router.put('/order/:orderId', updateOrder);

/**
 * @swagger
 * /order/{orderId}:
 *   delete:
 *     summary: Deleta um pedido existente
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *           example: "v10089015vdb-01"
 *         description: ID do pedido a ser deletado
 *     responses:
 *       200:
 *         description: Pedido deletado com sucesso
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Erro ao deletar pedido
 */
router.delete('/order/:orderId', deleteOrder);

module.exports = router;