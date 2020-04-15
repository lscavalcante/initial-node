'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async () => {
    const res = await Order
    .find({}, 'number status customer items')
    .populate('customer', 'name')
    //items.product e onde o id do produto esta se realizar um get ira ver o id dentro de items
    .populate('items.product', 'title');
    return res;
}

exports.create = async (data) => {
    var order = new Order(data);
    await order.save();
}