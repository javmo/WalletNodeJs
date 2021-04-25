const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    username: {type: String, required: true, index: { unique: true }},
    wallet: [{type: Schema.Types.ObjectId, ref: 'Wallet'}],
    created_at: { type: Date, default: Date.now }
});

module.exports = model('User',UserSchema);