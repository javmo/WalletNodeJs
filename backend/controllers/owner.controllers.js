const Owner = require('../models/Owner');
const Account = require('../models/Account');
const WalletService = require('../service/WalletServices');
const web3Service = require("../service/Web3Service");
const logger = require('../service/logger');

const walletService = new WalletService();

const getOwner = async (req , res) => {
    try{
        const owner = await Owner.findById(req.params.id);
        res.json(owner);
    }catch (e) {
        logger.warn(e);
        res.json(e).status(500);
    }
};

const getOwnerByName = async (req , res) => {
    try{
        const owner = await Owner.find({name: req.query.q})
        res.json(owner);
    }catch (e) {
        logger.warn(e);
        res.json(e).status(500);
    }
};

const getOwners = async (req , res) => {
    try{
        const owners = await Owner.find();
        res.json(owners);
    }catch (e) {
        logger.warn(e);
        res.json(e).status(500);
    }
};

const crateOwner = async (req, res) => {
    try{
        const  account = await web3Service.createAccount(req.body.password);
        
        const newOwner = new Owner({
            name: req.body.name,
        });
        const owner = await newOwner.save();
        
        await new Account({
            wallet: owner.id,
            address: account,
            password: req.body.password
        }).save();
    
        res.json(owner);

    }catch (e){
        logger.warn(e);
        res.json(e).status(500);
    }
}

const crateOwnerWithAccount = async (req, res) => {
    try{
        const newOwner = await new Owner({
            name: req.body.name
        }).save();
    
        console.log(newOwner);
        await new Account({
            wallet: newOwner.id,
            address: req.body.address,
            password: req.body.privateKey
        }).save();
    
        res.json(newOwner);

    }catch (e){
        logger.warn(e);
        res.json(e).status(500);
    }
}

const getOwnerWithAccount = async (req, res) => {
    try{
        const owner = await Owner.findById(req.params.id);

        const accounts = await walletService.getAccountsWithBalance(owner);
    
        res.json({wallet: owner, accounts: accounts });

    }catch (e){
        logger.warn(e);
        res.json(e).status(500);
    }
}

const loadOwnerAccount = async (req, res) => {
    let account;
    try{
        const owner = await Owner.findById(req.params.id);

        account = await Account.findOne({wallet: owner});

        try{
            const genesisAddress = await web3Service.getCoibaseAddress();

            const trxResult = await web3Service.send(genesisAddress,account.address,req.body.amount);

            res.json(trxResult);

        }catch (e) {
            logger.error(`:fire: Blockchain problem ${e}`);
            res.json(e).status(500);
        }
        
    }catch (e) {
        logger.warn(e);
        res.json(e).status(500);
    }
}

module.exports = {
    getOwner,
    crateOwner,
    getOwners,
    crateOwnerWithAccount,
    getOwnerByName,
    getOwnerWithAccount,
    loadOwnerAccount
}