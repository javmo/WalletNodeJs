const {Schema, model} = require('mongoose');

const AccountSchema = new Schema({
    wallet: {type: Schema.Types.ObjectId, ref: 'Wallet'},
    address: {type: String, required: true, index: { unique: true }},
    password: {type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = model('Account',AccountSchema);