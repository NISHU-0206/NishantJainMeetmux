const Order = require('../models/ordermodel');
const User = require('../models/usermodel');

exports.createOrder = async (req, res) => {
  try {
    const { user_id, total_price, shipping_address } = req.body;

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newOrder = new Order({
      user_id,
      total_price,
      shipping_address
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user_id');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getAllOrdersForUser = async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.params.user_id });
    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders' });
    }
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    const { status, shipping_address } = req.body;

    if (status) {
      order.status = status;
    }
    if (shipping_address) {
      order.shipping_address = shipping_address;
    }
    order.updated_at = Date.now();
    await order.save();
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = 'cancelled';
    await order.save();

    res.status(200).json({ message: 'Order cancelled successfully', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};