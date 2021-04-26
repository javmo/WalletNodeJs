const Owner = require('../models/Owner');


const web3Service = require("../service/Web3Service");

const getOwner = async (req , res) => {

    const owner = await Owner.findById(req.id)

    res.json(owner);
};

const getOwnerByName = async (req , res) => {

    const owner = await Owner.find({name: req.query.q})

    res.json(owner);
};

const getOwners = async (req , res) => {

    const owners = await Owner.find();

    res.json(owners);
};

const crateOwner = async (req, res) => {
    const  account = web3Service.createAccount();

    const newOwner = new Owner({
        name: req.body.name,
        address: account.address,
        privateKey: account.privateKey
    });
    const owner = await newOwner.save();

    res.json(owner);
}

const crateOwnerWithAccount = async (req, res) => {

    const newOwner = new Owner({
        name: req.body.name,
        address: req.body.address,
        privateKey: req.body.privateKey
    });
    const owner = await newOwner.save();
    res.json(owner);
}


module.exports = {
    getOwner,
    crateOwner,
    getOwners,
    crateOwnerWithAccount,
    getOwnerByName
}