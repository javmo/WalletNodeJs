const {Schema, model} = require('mongoose');

const WalletSchema = new Schema({
    name: {type: String, required: false},
    created_at: { type: Date, default: Date.now }
});

module.exports = model('Wallet',WalletSchema);