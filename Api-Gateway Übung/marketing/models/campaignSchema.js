const mongoose = require('mongoose');

const campaignSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    marketingId: { type: Number, required: true },
    productId: { type: Number, required: true },
    productDiscount: { type: Number, required: true }
});

module.exports = mongoose.model('campaign', campaignSchema);