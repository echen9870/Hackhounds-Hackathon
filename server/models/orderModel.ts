const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderType: { type: String, enum: ['in', 'out'], required: true },
    ordered: { type: Date, required: true }, 
    arrival: { type: Date, required: true }, 
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});

const Order = mongoose.model('Order', orderSchema, 'orders');

module.exports = Order;


