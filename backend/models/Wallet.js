const {Schema, model} = require('mongoose');

const WalletSchema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'Owner'},
    name: {type: String, required: false},
    created_at: { type: Date, default: Date.now }
});

module.exports = model('Wallet',WalletSchema);