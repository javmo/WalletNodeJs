const {Schema, model} = require('mongoose');

const OwnerSchema = new Schema({
    name: {type: String, required: true, index: { unique: true }},
    address: {type: String, required: true, index: { unique: true }},
    privateKey: {type: String, required: true, index: { unique: true }},
    created_at: { type: Date, default: Date.now }
});

module.exports = model('Owner',OwnerSchema);