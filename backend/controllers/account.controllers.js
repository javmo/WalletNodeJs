const Account = require('../models/Account');

const web3Service = require("../service/Web3Service");


const getAccount = async (req , res) => {
    // busca en los valores de task en el json y los trae
    const account = await Account.findById(req.id);

    res.json(account);
};

const getAccounts = async (req , res) => {

    const accounts = await Account.find();

    res.json(accounts);
};

const crateAccount = async (req, res) => {

    const account = await web3Service.createAccount(req.body.password);
    console.log(account);

    const newAccount = await new Account({
        wallet: req.body.wallet,
        address: account,
        password: req.body.password
    }).save();

    res.json(newAccount);
}


const importAccount = async (req, res) => {

    const newAccount = await new Account({
        wallet: req.body.wallet,
        address: req.body.address,
        password: req.body.password
    }).save();

    res.json(newAccount);
}

const getBalance = async (req , res) => {

    console.log(req.params.address)
    const balance = await web3Service.getBalanceOf(req.params.address)
    console.log(balance)

    res.json({balance: balance});
};


module.exports = {
    getAccount,
    getAccounts,
    crateAccount,
    getBalance,
    importAccount

}
