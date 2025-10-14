const express = require('express');
const orderrouter = express.Router();
const orderController = require('../controllers/orderController');
const protect = require('../middlewares/authmiddleware');

orderrouter.post('/', protect, orderController.createOrder);
orderrouter.get('/user/:user_id', protect, orderController.getAllOrdersForUser);
orderrouter.put('/:id', protect, orderController.updateOrder);
orderrouter.delete('/:id', protect, orderController.cancelOrder);

module.exports = orderrouter;