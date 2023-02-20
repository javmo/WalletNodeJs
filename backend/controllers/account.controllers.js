const Account = require('../models/Account.js');
const logger = require('../service/logger');

const web3Service = require("../service/Web3Service");


const getAccount = async (req , res) => {
    
     await Account.findById(req.params.id)
     .then(account => {
        res.json(account);
     })
    .catch(e => {
        logger.warn(e);
        res.json(e).status(500);
    });
};

const getAccounts = async (req , res) => {

    await Account.find()
    .then(accounts => {
        res.json(accounts);
    })
    .catch(e => {
        logger.warn(e);
        res.json(e).status(500);
    });
};

const crateAccount = async (req, res) => {

    await web3Service.createAccount(req.body.password)
    .then(async account => {
        logger.debug(account);
        await new Account({
            wallet: req.body.wallet,
            address: account,
            password: req.body.password
        })
        .save()
        .then(newAccount => {
            res.json(newAccount);
        })
        .catch(e => {
            logger.error({e});
            res.json(e).status(500);
        })
    })
    .catch(e => {
        logger.error(`:fire: error blockchain account creation ${e}`);
        res.json(e).status(500);
    })
}

const importAccount = async (req, res) => {

    await new Account({
        wallet: req.body.wallet,
        address: req.body.address,
        password: req.body.password
    })
    .save()
    .then(newAccount => {
        res.json(newAccount);
    })
    .catch(e => {
        logger.error({e});
        res.json(e).status(500);
    })
}

const getBalance = async (req , res) => {

    await web3Service.getBalanceOf(req.params.address)
    .then(balance => {
        res.json({balance: balance});
    })
    .catch(e => {
        logger.error(`:fire: error blockchain ${e}`);
        res.json(e).status(500);
    })   
};


module.exports = {
    getAccount,
    getAccounts,
    crateAccount,
    getBalance,
    importAccount
}
