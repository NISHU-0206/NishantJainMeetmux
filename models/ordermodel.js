const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  total_price: {
    type: Number,
    required: true,
    min: [0]
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending'
  },
  shipping_address: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: { 
    type: Date, 
    default: Date.now }
});

orderSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;